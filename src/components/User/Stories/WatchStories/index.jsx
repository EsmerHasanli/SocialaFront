import "swiper/css/navigation";

// import required modules
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Avatar, IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Context } from "../../../../main";
import { observer } from "mobx-react-lite";

const WatchStories = ({ storiesVisible, setStoriesVisible, story, storyItems, watchedStories, setWatchedStories }) => {
  const {store} = useContext(Context)
  function handleSlideChange(swiper) {
    const watchedStory = watchedStories?.find(ws => ws.id == story?.id);
    const slideIndex = swiper.realIndex
    if (watchedStory) {
        if (watchedStory?.lastWatchedStoryIndex < slideIndex) {
          watchedStory.lastWatchedStoryCreateTime = storyItems[slideIndex].createdAt;
          watchedStory.lastWatchedStoryIndex = swiper.realIndex

          const changedArr = watchedStories.filter(ws => ws.id != story.id);
          changedArr.push(watchedStory);
          setWatchedStories([...changedArr]);
          localStorage.setItem("watchedStories", JSON.stringify(changedArr))

        }
      }
    }

  return (
    <>
      {storiesVisible && (
        <div id="stories-wrapper">
          <IconButton
            onClick={() => setStoriesVisible(false)}
            style={{
              float: "right",
              width: "30px",
              height: "30px",
              backgroundColor: "antiquewhite",
            }}
          >
            <CloseIcon style={{ color: "rgba(0,0,0,0.7)" }} />
          </IconButton>
          <Swiper
            effect={"coverflow"}
            onSlideChange={handleSlideChange}
            grabCursor={true}
            initialSlide={watchedStories.find(ws => ws.id == story?.id)?.lastWatchedStoryIndex || 0}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={true}
            modules={[EffectCoverflow, Navigation]}
            className="stori-swiper"
          >
            {
              storyItems && storyItems.map(storyItem => (
                storyItem.type == 'Image' ?
                <SwiperSlide
                  key={storyItem.key}
                  className="swiper-slide"
                  style={{
                    backgroundImage:
                      `url(${storyItem.sourceUrl})`,
                  }}
                >
                  <div className="header">
                    <div>
                      <Avatar className="avatar" src={story?.ownerImageUrl} />
                      <p>{story?.ownerUserName}</p>
                    </div>
                    {
                      story.ownerUsername == store.user.userName &&
                      <IconButton>
                        <MoreHorizIcon style={{ color: "antiquewhite" }} />
                      </IconButton>
                    }
                  </div>

                  <div className="footer">
                    <p>{storyItem?.text}</p>
                    {
                      story.ownerUserName == store.user.userName && 
                        <button className="watch-wrapper">
                          <RemoveRedEyeIcon />
                          <span>222</span>
                        </button>
                    }
                  </div>
                </SwiperSlide> :
                  <SwiperSlide
                  key={storyItem.key}
                  className="swiper-slide"
                >
                  <div className="header">
                    <div>
                      <Avatar className="avatar" src={story?.ownerImageUrl} />
                      <p>{story?.ownerUserName}</p>
                    </div>
                    {
                      story.ownerUserName == store.user.userName &&
                      <IconButton>
                        <MoreHorizIcon style={{ color: "antiquewhite" }} />
                      </IconButton>
                    }
                  </div>
                  <video controls>
                    <source src={storyItem.sourceUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="footer">
                    <p>{storyItem?.text}</p>
                    {
                      story.ownerUserName == store.user.userName && 
                        <button className="watch-wrapper">
                          <RemoveRedEyeIcon />
                          <span>222</span>
                        </button>
                    }
                  </div>
                </SwiperSlide> 
              ))
            }
          </Swiper>
        </div>
      )}
    </>
  );
};

export default observer(WatchStories);