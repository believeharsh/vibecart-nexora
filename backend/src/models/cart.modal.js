import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { type: String, default: 'guest' },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 }
  }]
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);