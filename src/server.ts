import mongoose from "mongoose";
import app from "./app";
import Config_File from "./Config_File";
import { Server } from "socket.io";
import http from "http";
import { User } from "./Modules/User/user.model";
import Parcel from "./Modules/Parcel/parcel.model";

async function main() {
  try {
    await mongoose.connect(Config_File.database as string);

    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
       //  origin: "http://localhost:5173",
        origin: "https://courier-parcel-client.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      },
    });

    const agentLocations: Record<string, { lat: number; lng: number }> = {};

    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      socket.on("agentLocation", async ({ agentId, lat, lng }) => {
        agentLocations[agentId] = { lat, lng };

        await User.findByIdAndUpdate(agentId, {
          $set: {
            "location.lat": lat,
            "location.lng": lng,
            "location.updatedAt": new Date(),
          },
        });

        io.emit("locationUpdate", { agentId, lat, lng });
      });


    // Agent updates parcel status & optionally current location
      socket.on(
        "updateParcelStatus",
        async ({ parcelId, status, currentLocation }) => {
          try {
            const updateData: any = { status, updatedAt: new Date() };

            if (currentLocation && currentLocation.lat && currentLocation.lng) {
              updateData.currentLocation = currentLocation;
            }

            

            await Parcel.findByIdAndUpdate(parcelId, {
              $set: updateData,
            });

           
            io.emit("parcelStatusUpdated", {
              parcelId,
              status,
              currentLocation,
            });
          } catch (error) {
            console.error("Error updating parcel status:", error);
            socket.emit("error", { message: "Failed to update parcel status" });
          }
        },
      );

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    server.listen(Config_File.port, () => {
      console.log(`Server listening on port ${Config_File.port}`);
      console.log("WebSocket server running");
    });
  } catch (error) {
    console.error(error);
  }
}

main();
