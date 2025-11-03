const Invoice = require("../models/Invoice");

//@desc create new invoice
//@route POST/api/invoices
//@access private
exports.createInvoice = async(req,res) =>{
    try{
        const user = req.user;
        const {
                invoiceNumber,
                invoiceDate,
                dueDate,
                billFrom,
                billTo,
                items,
                notes,
                paymentTerms,
            } = req.body;
            
        //subtotal calculation
        let subtotal = 0;
        let taxTotal = 0;
        items.forEach((item)=>{
            subtotal += item.unitPrice * item.quantity;
            taxTotal += ((item.unitPrice * item.quantity) * (item.taxPercent || 0))/100;
        });

        const total = subtotal+taxTotal;

        const invoice = new Invoice({
            user,
            invoiceNumber,
            invoiceDate,
            dueDate,
            billFrom,
            billTo,
            items,
            notes,
            paymentTerms,
            subtotal,
            taxTotal,
            total,
        });

        await invoice.save();
        res.status(201).json(invoice);
    } catch(error) {
        res
        .status(500)
        .json({message: "Error creating invoice", error:error.message});
    }
};

//@desc get all invoices of logged-in user
//@route GET/api/invoices
//@access private
exports.getInvoices = async(req,res) => {
     try{
        const invoices = await Invoice.find({user: req.user.id}).populate("user","name email");
        res.json(invoices);

    } catch(error) {
        res
        .status(500)
        .json({message: "Error fetching invoice", error:error.message});
    }
};

//@desc get single invoice by ID
//@route GET/api/invoices/:id
//@access private
exports.getInvoiceById =  async(req,res)=>{
     try{
        const invoice = await Invoice.findById(req.params.id).populate("user","name email");
        if (!invoice) return res.status(404).json({message:"Ivoice not found"});
        res.json(invoice); 
    } catch(error) {
        res
        .status(500)
        .json({message: "Error fetching invoice", error:error.message});
    }
};

//@desc update invoice
//@route PUT/api/invoices/:id
//@access private
exports.updateInvoice =  async(req,res)=>{
     try{
        const{
            invoiceNumber,
            invoiceDate,
            dueDate,
            billFrom,
            billTo,
            items,
            notes,
            paymentTerms,
            status,
        } = req.body;

        //recalculate totals if items changes
        let subtotal = 0;
        let taxTotal = 0;
        if(items && items.length>0){
            items.forEach((item)=>{
                subtotal += item.unitPrice * item.quantity;
                taxTotal += ((item.unitPrice * item.quantity) * (item.taxPercent || 0))/100;
            });
        } 
        const total = subtotal + taxTotal;
        const updatedIvoice = await Invoice.findByIdAndUpdate(
            req.params.id,
            {
                invoiceNumber,
                invoiceDate,
                dueDate,
                billFrom,
                billTo,
                items,
                notes,
                paymentTerms,
                status,
                subtotal,
                taxTotal,
                total,
            },
            { new: true }
        );

        if(!updatedIvoice) return res.status(404).json({message:"Invoice not found"});
    }
    catch(error) {
        res
        .status(500)
        .json({message: "Error updating invoice", error:error.message});
    }
};

//@desc delete invoice
//@route DELETE/api/invoices/:id
//@access private
exports.deleteInvoice =  async(req,res)=>{
     try{
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if(!invoice) return res.status(404).json({message:"Invoice not found"});
        res.json({message:"Invoice deleted successfully"});
    } catch(error) {
        res
        .status(500)
        .json({message: "Error deleting invoice", error:error.message});
    }
};