import './index.scss'
import { Avatar, Divider, IconButton } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useContext, useState } from 'react';
import { Card, Skeleton, Switch } from 'antd';
import { Context } from '../../../main';
import { observer } from 'mobx-react-lite';
const { Meta } = Card;
const UserPostCard = () => {
    const {store} = useContext(Context)
    const [loading, setLoading] = useState(true);
    const onChange = (checked) => {
      setLoading(!checked);
    };

  return (
    <div id='user-posts-wrapper'>
        <div id='user-post-card'>
            <div className="header">
                <ul>
                    <li>
                        <Avatar src="https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-3.jpg"/>
                        <p>
                            <span>Monroe Parker</span>
                            <span>2 hours ago</span>
                        </p>
                    </li>

                    <li>
                        <IconButton>
                            <MoreHorizIcon />
                        </IconButton>
                    </li>
                </ul>
            </div>

            <Divider/>

            <div className="post-content">
                <img src="https://demo.foxthemes.net/socialite-v3.0/assets/images/post/img-2.jpg" alt="" />
                <div className="icons-wrapper">
                    <IconButton style={{backgroundColor:'rgb(254,226,226)', color:'rgb(239,68,68)'}}>
                        <FavoriteIcon/>
                    </IconButton>
                    {/* <IconButton style={{backgroundColor:'rgb(254,226,226)', color:'rgb(239,68,68)'}}>
                        <FavoriteBorderIcon/>
                    </IconButton> */}
                    <IconButton style={{backgroundColor:'rgb(235,239,244)', color:'rgb(75,85,99)'}}>
                        <MapsUgcIcon/>
                    </IconButton>
                </div>
            </div>

            <Divider/>

            <div className="comments">
                <ul>
                    <li>
                        <Avatar/>
                        <div>
                            <h6>User user</h6>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </li>
                    <li>
                        <Avatar/>
                        <div>
                            <h6>User user</h6>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </li>
                </ul>
                <button><ExpandMoreIcon/><span>More Comments</span></button>
            </div>

            <Divider/>

            <div className="my-comment">
                <div>
                    <Avatar/>
                    <input placeholder='Add Comment....' type="text" />
                </div>
                <button>Reply</button>
            </div>

        </div>

        <div id='user-post-card'>
            <div className="header">
                <ul>
                    <li>
                        <Avatar src="https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-3.jpg"/>
                        <p>
                            <span>Monroe Parker</span>
                            <span>2 hours ago</span>
                        </p>
                    </li>

                    <li>
                        <IconButton>
                            <MoreHorizIcon />
                        </IconButton>
                    </li>
                </ul>
            </div>

            <Divider/>

            <div className="post-content">
                <p>
                Photography is the art of capturing light with a camera. It can be used to create images that tell stories, express emotions, or document reality. it can be fun, challenging, or rewarding. It can also be a hobby, a profession, or a passion. 📷
                </p>
                <div className="icons-wrapper">
                    <IconButton style={{backgroundColor:'rgb(254,226,226)', color:'rgb(239,68,68)'}}>
                        <FavoriteIcon/>
                    </IconButton>
                    {/* <IconButton style={{backgroundColor:'rgb(254,226,226)', color:'rgb(239,68,68)'}}>
                        <FavoriteBorderIcon/>
                    </IconButton> */}
                    <IconButton style={{backgroundColor:'rgb(235,239,244)', color:'rgb(75,85,99)'}}>
                        <MapsUgcIcon/>
                    </IconButton>
                </div>
            </div>

            <Divider/>

            <div className="comments">
                <ul>
                    <li>
                        <Avatar/>
                        <div>
                            <h6>User user</h6>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </li>
                    <li>
                        <Avatar/>
                        <div>
                            <h6>User user</h6>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </li>
                </ul>
                <button><ExpandMoreIcon/><span>More Comments</span></button>
            </div>

            <Divider/>

            <div className="my-comment">
                <div>
                    <Avatar/>
                    <input placeholder='Add Comment....' type="text" />
                </div>
                <button>Reply</button>
            </div>

        </div>


        {/* <Switch checked={!loading} onChange={onChange} /> */}
        <Card
            style={{ width: '100%', marginTop: 16, border:'none' }}
        >
            <Skeleton loading={loading} avatar active>
            <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
                title="Card title"
                description="This is the description"
            />
            </Skeleton>
        </Card>
    </div>
  )
}

export default observer(UserPostCard)