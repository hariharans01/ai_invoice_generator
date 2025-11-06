import React, { useState, useEffect } from "react";
import { Loader2, Mail, Copy, Check } from "lucide-react";
import Button from "../ui/Button"; // ✅ Fixed Button import
import TextareaField from "../ui/TextareaField";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import toast from "react-hot-toast";

const ReminderModal = ({ isOpen, onClose, invoiceId }) => {
  const [reminderText, setReminderText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (isOpen && invoiceId) {
      const generateReminder = async () => {
        setIsLoading(true);
        setReminderText("");

        try {
          const response = await axiosInstance.post(
            API_PATHS.AI.GENERATE_REMINDER,
            { invoiceId }
          );
          setReminderText(response.data.reminderText);
        } catch (error) {
          toast.error("Failed to generate reminder.");
          console.error("AI reminder error:", error);
          onClose();
        } finally {
          setIsLoading(false);
        }
      };

      generateReminder();
    }
  }, [isOpen, invoiceId, onClose]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(reminderText);
    setHasCopied(true);
    toast.success("Reminder copied to clipboard!");
    setTimeout(() => setHasCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center">
            <Mail className="w-5 h-5 mr-2 text-blue-900" />
            AI-Generated Reminder
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <TextareaField
            name="reminderText"
            value={reminderText}
            readOnly
            rows={10}
            placeholder="Generated reminder will appear here..."
          />
        )}

        {/* Footer */}
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={handleCopyToClipboard}
            icon={hasCopied ? Check : Copy}
            disabled={isLoading || !reminderText}
          >
            {hasCopied ? "Copied" : "Copy Text"}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default ReminderModal;
