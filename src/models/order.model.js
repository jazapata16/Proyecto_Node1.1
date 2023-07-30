import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    urlimages: {
      type: [String],
    },
    orderStatus: {
      type: String,
      //required: true,
    },
    user: {
      
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    billingInfo: {
      type: String,
      //required: true,
    },
    shippingInfo: {
      type: String,
      //required: true,
    },
    courier:{
      type:String,
      // enum: ['ECUADOR EXPRESS','SERVIRAPIDO','NULL']
    },
    orderStatus:{
      type:String,
      // enum: ['ENVIADA','EN DESPACHO','ENTREGADA','DEVUELTA POR COURIER','CANCELADA']
    },
    ordermotivo:{
      type:String,
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
