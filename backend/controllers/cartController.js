import { db } from "../config/db.js";

const addToCart = async (req, res) => {
    try {
        let id = req.body.userId;

        let userData = await db.query("SELECT * FROM public.users WHERE id = $1", [id]);

        let cartData = userData.rows[0].cart_data || {};

        if (!cartData[req.body.id]) {
            cartData[req.body.id] = 1;
        } else {
            cartData[req.body.id] += 1;
        }

        await db.query("UPDATE users SET cart_data = $1 WHERE id = $2", [cartData, id]);

        res.json({ success: true, message: "Successfully added to cart" });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: "Error while adding to the cart" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        let id = req.body.userId;

        let userData = await db.query("SELECT * FROM public.users WHERE id = $1", [id]);

        let cartData = userData.rows[0].cart_data || {};

        if (cartData[req.body.id] > 0) {
            cartData[req.body.id] -= 1;

            if (cartData[req.body.id] === 0) {
                delete cartData[req.body.id];
            }
        }

        await db.query("UPDATE users SET cart_data = $1 WHERE id = $2", [cartData, id]);

        res.json({ success: true, message: "Removed from the cart" });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: "Error while removing from the cart" });
    }
};

const getCart = async (req, res) => {
    try {
        let id = req.body.userId;

        let user = await db.query("SELECT * FROM public.users WHERE id = $1", [id]);

        let cartData = user.rows[0].cart_data|| {};

        res.json({ success: true, cartData });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: "Could not get Cart" });
    }
};

const emptyCart = async (req, res ) => {
    try {
        let id = req.body.userId;

        let userData = await db.query("SELECT * FROM public.users WHERE id = $1", [id]);

        let cartData = userData.rows[0].cart_data || {};

        console.log(cartData);

        for (let key in cartData) {
            if (cartData.hasOwnProperty(key)) {
                cartData[key] = 0;
            }
        }

        console.log(cartData);

        await db.query("UPDATE users SET cart_data = $1 WHERE id = $2", [cartData, id]);

        res.json({ success: true, message: "Emptied the cart" });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: "Error while removing from the cart" });
    }
}

export { addToCart, removeFromCart, getCart , emptyCart };
