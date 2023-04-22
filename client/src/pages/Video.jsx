import React, {useState, useEffect} from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card"
import { useLocation } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import fetchSuccess from '../redux/videoSlice'
import axios from "axios";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;
//
const Title = styled.h1`
font-size: 18px;
font-weight: 400;
margin-top: 20px;
margin-bottom: 10px;
color: ${({ theme }) => theme.text};
`;
//
const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;
//
const Info = styled.span`
color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
display: flex;
gap: 20px;
color: ${({ theme }) => theme.text};
`;
//
const Button = styled.div`
display: flex;
align-items: center;
gap: 5px;
cursor: pointer;
`;
//
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
//
const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: blue;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {
  // take the current user and using dispatch to apply our actions
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];  // it will take the second item 

  // going to create two states here 

  const [channel, setChannel] = useState({});
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch two data
        const videoRes = await axios.get(`/videos/find/${path}`); // video id
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`   // inside video we have user id
        );
       
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data)); // updating video slice
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]); // dependency

  // we are gonna take the id and fetch the video for that we are using useLocation hook

    return (
        <Container>
            <Content>
                <VideoWrapper>
                <iframe
                    width="100%"
                    height="500"
                    src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
                </VideoWrapper>
                <Title>{currentVideo.title}</Title>
                <Details>
                    <Info>{currentVideo.views} . {format(currentVideo.createdAt)}</Info>
                    <Buttons>
                        <Button>
                            <ThumbUpOutlinedIcon /> 123
                        </Button>
                        <Button>
                            <ThumbDownOffAltOutlinedIcon /> Dislike
                        </Button>
                        <Button>
                            <ReplyOutlinedIcon /> Share
                        </Button>
                        <Button>
                            <AddTaskOutlinedIcon /> Save
                        </Button> 
                    </Buttons>
                </Details>
                <Hr/>
                <Channel>
                    <ChannelInfo>
                        <Image src="data:image/png;base64,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"/>
                        <ChannelDetail>
                            <ChannelName>WEB-DEV</ChannelName>
                            <ChannelCounter>100k subscribers</ChannelCounter>
                            <ChannelName>
                            <Description>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Doloribus laborum delectus unde quaerat dolore culpa sit aliquam
                            at. Vitae facere ipsum totam ratione exercitationem. Suscipit
                            animi accusantium dolores ipsam ut.
                            </Description>
                            </ChannelName>
                        </ChannelDetail>
                    </ChannelInfo>
                    <Subscribe>Subscribe</Subscribe>
                </Channel>
                <Hr/>
                <Comments/>
            </Content>
            {/*<Recommendation>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
              <Card type="sm"/>
            </Recommendation>*/}
        </Container>
    )
}

export default Video;