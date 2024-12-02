import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../libs/supabase";
import BasicModal from "../mui/BasicModal";
import { EventContentArg, EventInput } from "@fullcalendar/core/index.js";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";

interface EventProps {
  id: number;
  title: string;
  start: string;
  end: string;
}

const Events = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), [open]);
  const handleClose = useCallback(() => setOpen(false), [open]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = useCallback(async () => {
    const { data, error } = await supabase.from("events").select("*");
    if (error) {
      console.error("Error fetching events:", error);
      return [];
    }

    const formattedEvents = data.map((item) => ({
      id: item.id.toString(),
      title: item.title,
      start: item.start_time,
      end: item.end_time,
    }));

    setEvents(formattedEvents);
  }, [events]);

  async function addEvent(newEvent: any) {
    const { data, error } = await supabase.from("events").insert([newEvent]);
    if (error) {
      toast.error("Tədbir əlavə edilmədi");
      console.error("Error adding event:", error);
      return;
    }
    setEvents((prev) => [...prev, ...(data || [])]);
    toast.success("Tədbir əlavə edildi");
    setOpen(false);
    await fetchEvents();
  }

  async function deleteEvent(eventId: string) {
    const { error } = await supabase.from("events").delete().eq("id", eventId);
    if (error) {
      toast.error("Tədbir silinmədi");
      console.error("Error deleting event:", error);
      return;
    }
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
    await fetchEvents();
  }

  const renderComponent = useCallback((event: EventProps | EventContentArg) => {
    const eventTitle = "title" in event ? event.title : event.event.title;
    const eventTime = "timeText" in event && event.timeText;

    return (
      <div className="flex gap-1 justify-between my-1 mx-auto w-[100%] justify-center items-center bg-black rounded-lg p-1 text-white">
        <div className="text-slate-500 mr-2">{eventTime}</div>
        <div>{eventTitle}</div>
        <div className="flex gap-2">
          <button className=" text-white px-2 py-1 rounded">
            <MdDeleteOutline size={15} />
          </button>
        </div>
      </div>
    );
  }, []);

  return (
    <div className="px-3 md:px-10 my-5 md:my-10">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderComponent}
        headerToolbar={{
          left: "prev,next today addEvent",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        titleFormat={{
          year: "numeric",
          month: "long",
          day: "numeric",
        }}
        buttonText={{
          today: "Bugün",
          month: "Ay",
          week: "Həftə",
          day: "Gün",
          list: "List",
          next: "Sonrakı",
          prev: "Əvvəlki",
        }}
        customButtons={{
          addEvent: {
            text: "Tədbir əlavə et",
            click: handleOpen,
          },
        }}
        editable={true}
        selectable={true}
        eventClick={(info) => {
          const confirmDelete = window.confirm(
            `Delete event: ${info.event.title}?`
          );
          confirmDelete && deleteEvent(info.event.id);
        }}
      />
      <div>
        {open && <BasicModal open onClose={handleClose} addEvent={addEvent} />}
      </div>
    </div>
  );
};
export default Events;
