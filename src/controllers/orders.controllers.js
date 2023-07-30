import Order from "../models/order.model.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user : req.user.id }).populate("user");
    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
    
  } catch (error) {
    return res.status(500).json({ message: error.message , });
  }
};

export const createOrder = async (req, res) => {
  try {
    console.log(req.body)
    const { urlimages, title,billingInfo,shippingInfo} = req.body;
    const newOrder = new Order({
      urlimages,
      title,
      orderStatus:'ENVIADO',
      billingInfo,
      shippingInfo,
      user: req.user.id,
      courier:'NULL',
      ordermotivo:'NULL'
    });
    await newOrder.save();
    res.json(newOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { title,billingInfo,shippingInfo, orderStatus,courier,ordermotivo} = req.body;
    const orderUpdated = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { title,billingInfo,shippingInfo,orderStatus,courier,ordermotivo },
      { new: true }
    );
    return res.json(orderUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateOrderOperador = async (req, res) => {
  try {
    const {orderStatus,id} = req.body;
    const orderUpdated = await Order.findOneAndUpdate(
      { _id: id},
      {orderStatus},
      { new: false }
    );
    return res.json(orderUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCourier = async (req, res) => {
  try {
    const { courier } = req.body;
    const orderUpdated = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { courier},
      { new: true }
    );
    return res.json(orderUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
