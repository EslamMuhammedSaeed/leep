import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { setViewState } from '@carto/react-redux';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    display:'none !important',
    '& .content': {
      ...theme.typography.caption,
      position: 'relative',
      padding: theme.spacing(1, 1.5),
      // borderRadius: theme.shape.borderRadius,
      borderRadius: '5px',
      backgroundColor: theme.palette.grey[900],
      // backgroundColor: 'white',
      opacity:'1',
      zIndex:'999',
      color: 'white',
      boxShadow: "5px 5px 15px #2929295b",
      maxHeight:'100px',
      overflowY:'scroll',
      // paddingBottom:'50px !important',
      transform: `translate(-50%, calc(-100% - ${theme.spacing(2.5)}px))`,
      '& strong':{
        minWidth:'200px',
        paddingBottom:'5px !important',
        // display:'inline-block',
        display:'block',
        color: 'rgb(224, 224, 224)',
        // color:'#2929295b',

      },


      '& .arrow': {
        display: 'block',
        position: 'absolute',
        top: 'calc(100% - 1px)',
        left: '50%',
        width: 0,
        height: 0,
        marginLeft: theme.spacing(-1),
        borderLeft: `${theme.spacing(1)}px solid transparent`,
        borderRight: `${theme.spacing(1)}px solid transparent`,
        borderTop: `${theme.spacing(1)}px solid ${theme.palette.grey[900]}`,
        // borderTop: `${theme.spacing(1)}px solid white`,
      },
    },
  },
}));

export function useMapHooks() {
  const classes = useStyles();
  const dispatch = useDispatch();

  let isHovering = false;
  let isClicking = false;

  const handleViewStateChange = ({ viewState }) => {
    dispatch(setViewState(viewState));
  };

  const handleSizeChange = ({ width, height }) => {
    dispatch(setViewState({ width, height }));
  };

  const handleHover = ({ object }) => {
    (isHovering = !!object);
    // console.log(isHovering);
    // if(isHovering===true){
    //   window.onclick=function(){
    //     isClicking=true;
    //   }
   
    // }else{
    //   window.onclick=function(){
    //     isClicking=false;
    //   }
    // }
    // console.log('c:'+isClicking);
    // isHovering=isClicking;
    // console.log('t:'+isHovering);
  };
  
  const handleCursor = ({ isDragging }) =>{
    // isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab';
    // console.log(isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab');
    let s =isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab';
    // console.log(s=='grabbing');
    if(s=='grabbing'){
      console.log(isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab');
      if(document.getElementById('custom-tooltip')){
        console.log('jjjj');
        let div2 = document.getElementById('custom-tooltip');
        div2.classList.remove('d-block');
        div2.classList.add('d-none');
      }
    }
    return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab';
  }

    
   
  
    
   

  const handleTooltip = (info) => {
    
    if (info?.object) {
      // console.log(info.object.html);
      // info.object.html = info.object.html.replace(':','');
      return {
        html: `<div class='content'>${info.object.html.replaceAll(':','')
        .replaceAll('poverty_percentage_2017_2018','Poverty percentage')
        .replaceAll('name','Name')
        .replaceAll('<div class="pop-up"><strong>longitude','<div class="pop-up" style="display:none"><strong>lonitude')
        .replaceAll('<br/>','<br/><div style="min-height:5px;"></div>')}<div class='arrow'></div></div>`,
        className: classes.tooltip,
        style: {
          padding: 0,
          background: 'none',
        },
        
      };
    }
  };

  return {
    handleViewStateChange,
    handleSizeChange,
    handleHover,
    handleCursor,
    handleTooltip,
  };
}
