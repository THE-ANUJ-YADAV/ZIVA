import wishlistModel from "../models/wishlist.model.js";

export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        let wishlist = await wishlistModel.findOne({ user: req.user._id });
        
        if (!wishlist) {
            wishlist = await wishlistModel.create({ user: req.user._id, items: [] });
        }

        const isProductAlreadyInWishlist = wishlist.items.some(item => item.product.toString() === productId);

        if (isProductAlreadyInWishlist) {
            return res.status(400).json({
                message: "Product is already in wishlist",
                success: false
            });
        }

        wishlist.items.push({ product: productId });
        await wishlist.save();

        return res.status(200).json({
            message: "Product added to wishlist successfully",
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        
        const wishlist = await wishlistModel.findOneAndUpdate(
            { user: req.user._id },
            { $pull: { items: { product: productId } } },
            { new: true }
        ).populate("items.product");

        if (!wishlist) {
            return res.status(404).json({
                message: "Wishlist not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Item removed from wishlist",
            success: true,
            wishlist
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const user = req.user;

        let wishlist = await wishlistModel.findOne({ user: user._id }).populate("items.product");

        if (!wishlist) {
            wishlist = await wishlistModel.create({ user: user._id });
        }
        
        return res.status(200).json({
            message: "Wishlist fetched successfully",
            success: true,
            wishlist
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
