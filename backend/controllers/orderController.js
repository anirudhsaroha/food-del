import { db } from "../config/db.js";

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const serializedItems = JSON.stringify(items);
    const serializedAddress = JSON.stringify(address);

    await db.query(
      "INSERT INTO orders (user_id, items, amount, address) VALUES ($1, $2, $3, $4)",
      [userId, serializedItems, amount, serializedAddress]
    );

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Error while placing the order" });
  }
};

const userOrders = async (req, res) => {
  try {
    const user_id = req.body.userId;
    const response = await db.query("SELECT * FROM public.orders WHERE user_id = $1 ORDER BY id DESC", [user_id]);
    res.json({ success: true, orders: response.rows });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while fetching" });
  }
};

const getOrder = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM public.orders ORDER BY id DESC");
    res.json({ success: true, orders: response.rows });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while fetching" });
  }
};

const updateStatus = async (req, res) => {
  const { orderId, newStatus } = req.body;

  if (!orderId || !newStatus) {
    return res.status(400).json({ success: false, message: "Order ID and new status are required" });
  }

  try {
    const result = await db.query(
      "UPDATE orders SET status = $1 WHERE id = $2",
      [newStatus, orderId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ success: false, message: "Error while updating order status" });
  }
};

export { placeOrder, userOrders, getOrder, updateStatus };
