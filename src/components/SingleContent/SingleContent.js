import { Badge } from "@material-ui/core";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import ContentModal from "../ContentModel/ContentModel.js";

const SingleContent = (props) => {
  return (
    <>
      <ContentModal media_type={props.media_type} id={props.id}>
        <Badge
          badgeContent={props.vote_average}
          color={props.vote_average > 6 ? "primary" : "secondary"}
        />

        <img
          className="poster"
          src={
            props.poster_path ? `${img_300}/${props.poster_path}` : unavailable
          }
          alt={props.title}
        />
        <b className="title">
          {props.media_type === "tv" ? props.name : props.title}
        </b>
        <span className="subTitle">
          {props.media_type === "tv" ? " TV Series" : " Movie"}
          <span className="subTitle">
            {props.media_type === "tv"
              ? props.first_air_date
              : props.release_date}
          </span>
        </span>
      </ContentModal>
    </>
  );
};
export default SingleContent;
