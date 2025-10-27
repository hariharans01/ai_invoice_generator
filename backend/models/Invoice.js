const mongoose = require("mongoose")

const itemsSchema = new mongoose.Schema({
    name: {type:String, requird:true},
    quantity: {type:Number, required:true},
    unitPrice: {type:Number, required:true},
    taxPercent: {type:Number, default: 0},
    total: {type: Number, required: true},
});

const invoiceSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    invoiceNumber: {
        type: String,
        required: true,
    },
    invoiceData: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
    },
    billFrom: {
        businessName: String,
        email: String,
        address: String,
        phone: String,
    },
    billTo: {
        clientName: String,
        email: String,
        address: String,
        phone: String,
    },
    items: [itemsSchema],
    notes: {
        type: String,
    },
    paymentTerms: {
        type: String,
        default:"Net 15",
    },
    status: {
        type: String,
        enum: ["paid","Unpaid"],
        default:"Unpaid",
    },
    subtotal: Number,
    taxTotal: Number,
    total: Number,
    },
    { timestamps: true }
);
module.exports = mongoose.model("Invoice",invoiceSchema);