'use server'
import connectDB from "@/lib/mongodb";
import Event from '@/database/event.model';

export const getsimilarEventBySlug = async (slug: string) => {
    try {
        await connectDB();

        const event = await Event.findOne({ slug }).lean();
        if (!event) return [];

        const similarEvent = await Event.find({
            _id: { $ne: event._id },
            tags: { $in: event.tags }
        }).lean();

        return similarEvent;

    } catch (error) {
        console.error(error);
        return [];
    }
};