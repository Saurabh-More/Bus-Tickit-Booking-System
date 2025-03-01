import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    aperture: {
      type: Date,
      required: true,
    },
    departure: {
      type: Date,
      required: true,
    },
    totalSeats: { type: Number, required: true },
    duration: {
      type: Number,
      min: 0,
    },
},{timestamps: true});

busSchema.pre("save", function (next) 
{
    if (this.aperture && this.departure) 
    {
        if (this.departure <= this.aperture) 
        {
            return next(new Error("Departure must be after aperture time."));
        }
        // Calculate duration in minutes
        this.duration = (this.departure - this.aperture) / (1000 * 60);
    }
    next();
});

const Bus = mongoose.models.Bus || mongoose.model("Bus", busSchema);

export { Bus };
