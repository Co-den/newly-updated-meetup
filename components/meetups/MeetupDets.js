import classes from './MeetupDets.module.css';




function MeetupDets(props) {
    return (
        <section className={classes.detail}>
            <img src={props.image}
                alt={props.title} />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    );
}

export default MeetupDets;