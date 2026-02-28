import {notFound} from "next/navigation";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import {IEvent} from "@/database";
import {getsimilarEventBySlug} from "@/lib/actions/event.actions";
import EventCard from "@/components/EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({icons , alt , label}:{icons:string; alt:string;label:string})=>(
    <div className="flex-row-gap-2 items-center">
        <Image src={icons} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)

const EventAgenda = ({agendaItem}:{agendaItem:string[]})=>(
    <div>
        <h2>Agenda</h2>
        <ul>
            {agendaItem.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>

)

const EventTag = ({tags}:{tags:string[]})=>(
    <div className="flex flex-row-gap-2 flex- wrap">
        {tags.map((tag)=>(
        <div className="pill" key={tag}>{tag}</div>
        ))}
    </div>
)

const EventDetailsPage = async({params}:{params:Promise<{slug:string}>}) => {
    const {slug} = await params;
    const request  = await fetch(`${BASE_URL}/api/events/${slug}`);
    const {event:{description , image, overview ,date ,time ,location, mode,agenda , audience , organizer,tags}} = await request.json();

    if(!description)return notFound();

    const bookings = 10;

    const similarEvents:IEvent[] = await getsimilarEventBySlug(slug);

    return (
        <section id="event">
            <div className="header">
            <h1>Event Description<br/>{slug}:</h1>
            <p>{description}</p>
            </div>

            <div className="details">
                {/* Left side - Event Content */}
                    <div className="content">
                        <Image src={image} alt="Event Banner" width={600} height={600} />

                        <section className="flex-column">
                            <h2>Overview</h2>
                            <p>{overview}</p>
                        </section>

                        <section className="flex-col-gap-2">
                            <h2>Event Details</h2>
                            <EventDetailItem icons="/icons/calendar.svg" alt="calender" label={date} />
                            <EventDetailItem icons="/icons/clock.svg" alt="clock" label={time} />
                            <EventDetailItem icons="/icons/pin.svg" alt="location" label={location} />
                            <EventDetailItem icons="/icons/mode.svg" alt="mode" label={mode} />
                            <EventDetailItem icons="/icons/audience.svg" alt="audience" label={audience} />
                        </section>

                        <EventAgenda agendaItem={agenda}/>

                        <section className="flex-col-gap-2">
                            <h2>About The Organizer</h2>
                            <p>{organizer}</p>
                        </section>

                        <EventTag tags={tags}/>
                    </div>
                {/* Right side - Event Content */}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">
                                Join {bookings} people have already booked the spot
                            </p>
                        ):(
                            <p className="text-sm">
                                Be the first to book your spot!
                            </p>
                        )}
                        <BookEvent/>
                    </div>
                </aside>
            </div>

            <div className="flex w-flex flex-col gap-4 pt-20">
                <h2>Similar Event </h2>
                <div className="events">
                    {similarEvents?.length > 0 &&
                        similarEvents.map((similarEvent: IEvent) => (
                            <EventCard key={similarEvent._id.toString()} {...similarEvent} />
                        ))}
                </div>
            </div>

        </section>
    )
}
export default EventDetailsPage
