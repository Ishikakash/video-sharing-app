import React,{useEffect, useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import {format} from "timeago.js";

const Container = styled.div`
    width: ${(props) => props.type !== "sm" && "300px"};
    margin-bottom: ${(props)=>props.type === "sm" ? "10px" : "45px"};
    cursor: pointer;
    display: ${(props)=>props.type === "sm" && "flex"};
    gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props)=>props.type === "sm" ? "120px" : "202px"};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props)=>props.type !== "sm" && "16px"};;
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props)=>props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 8px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({type, video}) => {

  // fetching channel information
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      // need to write here user id, already have video and inside this video we have user id
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]); // whenever we change the id its gonna fire this func again and again
  
  // link to will take to the page after clicking on a video
    return (
      <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src={video.imgUrl}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel.img}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
    )
}

export default Card;

// VIDEOS VIEWS ARE CHANGED THORUGH MONGODBS