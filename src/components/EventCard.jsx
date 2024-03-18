import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function storeCard(props) {
  const router = useRouter();
  const [date, setDate] = useState(null);
  const [month, setMonth] = useState(null);
  const monthAbbrs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  useEffect(() => {
    const eventDate = new Date(props.date)

    setDate(eventDate.getDate())
    setMonth(eventDate.getMonth())
  }, []);

  return (
    <Link href={`/events/${props.id}`} className="card">
      <div className="event-card-upper">
        <div className="event-card-img-container">
          <img src="/assets/dog.jpg" alt="a jack russtle terrier" />
        </div>
        <span className="event-date">
          <h5>{date}</h5>
          <p>{monthAbbrs[month-1]}</p>
        </span>
      </div>
      <div className="event-card-information">
        <div className="m-0 flex items-center">
          <h5 className="font-semibold">{props.name}</h5>
        </div>
        <div className="m-0 flex items-center">
          <p>Click for more information</p>
        </div>
      </div>
    </Link>
  );
}
