import { Avatar } from "@material-ui/core";

function Card(props:any) {
  return (
    <div className="main">
      <div className="Client-Card" style={{ display: "flex" }}>
        <Avatar
          imgProps={{ style: { borderRadius: "50%" } }}
          className="avatar"
          src={props.avatar}
        />
        <p style={{ marginTop: 25 }}>
          <span>&ldquo;</span>
          {props.comment}
        </p>
        <p>
          <span className="Name">
            {props.name}
          </span>
        </p>
        <p className="designation">
          <span>{props.profession}</span>
        </p>
      </div>
    </div>
  );
}

export default Card;
