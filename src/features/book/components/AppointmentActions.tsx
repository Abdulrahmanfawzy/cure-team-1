import { useState } from "react";

import { Button } from "@/components/ui/button";

import CancelBookingModal from "./CancelBookingModal";
import RescheduleModal from "./RescheduleModal";
import BookAgainModal from "./BookAgainModal";
import SupportModal from "./SupportModal";
import FeedbackModal from "./FeedbackModal";

type AppointmentStatus = "upcoming" | "completed" | "canceled" | "pending";

interface AppointmentActionsProps {
  status: AppointmentStatus;
  bookingId: string;
}

export default function AppointmentActions({
  status,
  bookingId,
}: AppointmentActionsProps) {
  const [cancelOpen, setCancelOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);

  const [bookAgainOpen, setBookAgainOpen] = useState(false);

  const [supportOpen, setSupportOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <>
      {/* UPCOMING */}

      {status === "upcoming" && (
        <div className="mt-5 grid grid-cols-2 gap-7">
          <Button
            variant="outline"
            size="xl"
            onClick={() => setCancelOpen(true)}
          >
            Cancel
          </Button>

          <Button
            size="xl"
            className="bg-app-primary"
            onClick={() => setRescheduleOpen(true)}
          >
            Reschedule
          </Button>
        </div>
      )}

      {/* COMPLETED */}

      {status === "completed" && (
        <div className="mt-5 grid grid-cols-2 gap-7">
          <Button
            variant="outline"
            size="xl"
            className="text-app-primary"
            onClick={() => setBookAgainOpen(true)}
          >
            Book again
          </Button>

          <Button
            size="xl"
            className="bg-app-primary text-white"
            onClick={() => setFeedbackOpen(true)}
          >
            Feedback
          </Button>
        </div>
      )}

      {/* CANCELED / PENDING */}

      {(status === "canceled" || status === "pending") && (
        <div className="mt-5 grid grid-cols-2 gap-7">
          <Button
            variant="outline"
            size="xl"
            className="text-app-primary"
            onClick={() => setBookAgainOpen(true)}
          >
            Book again
          </Button>

          <Button
            size="xl"
            className="bg-app-primary text-white"
            onClick={() => setSupportOpen(true)}
          >
            Support
          </Button>
        </div>
      )}

      {/* MODALS */}

      <CancelBookingModal
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        bookingId={bookingId}
      />

      <RescheduleModal
        open={rescheduleOpen}
        onOpenChange={setRescheduleOpen}
        bookingId={bookingId}
      />

      <BookAgainModal
        open={bookAgainOpen}
        onOpenChange={setBookAgainOpen}
        bookingId={bookingId}
      />

      <SupportModal
        open={supportOpen}
        onOpenChange={setSupportOpen}
        bookingId={bookingId}
      />

      <FeedbackModal
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        bookingId={bookingId}
      />
    </>
  );
}
