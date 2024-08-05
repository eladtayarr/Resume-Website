
document.getElementById("year_f").innerHTML = new Date().getFullYear();

gsap.registerPlugin(ScrollTrigger);
var pageContainer = document.querySelector("#page_cont");
var scroller = document.querySelector('#page_cont')
var  smoothScroll

/* ######################## LOCOMOTIVE + SCROLLTRIGGER SETTING ######################## */
smoothScroll = new LocomotiveScroll(
    {
        el: document.querySelector(".data-scroll-container"),
        smooth: true,
        smoothMobile: true,
        el: pageContainer,
        smooth: true,
        resetNativeScroll: true,
        lerp:0.03,
        class: "active",
        smartphone: 
        {
        smooth: true
        },
        tablet: 
        {
        smooth: true
        }
    });

/* ###################### Background GISAP Cover Scale pLugin  ######################  */

const BackgroundSizePlugin = {
    name: "backgroundSize",
    getSize(target, config) {
      let o = {};
      BackgroundSizePlugin.init.call(o, gsap.utils.toArray(target)[0], config);
      return {width: o.sw + o.cw, height: o.sh + o.ch};
    },
    init(target, vars) {
      typeof(vars) !== "object" && (vars = {size: vars});
      let cs = window.getComputedStyle(target),
        imageUrl = cs.backgroundImage,
        {nativeWidth, nativeHeight, scale, size} = vars,
        parsedScale = scale || scale === 0 ? scale : 1,
        data = this,
        image, w, h, ew, eh, ratio, start, end,
        getSize = (size, scale) => {
          if (!/\d/g.test(size) || size.indexOf("%") > -1) {
            ratio = nativeWidth / nativeHeight;
            if (size === "cover" || size === "contain") {
              if ((size === "cover") === (nativeWidth / ew > nativeHeight / eh)) {
                h = eh;
                w = eh * ratio;
              } else {
                w = ew;
                h = ew / ratio;
              }
            } else { // "auto" or %
              size = size.split(" ");
              size.push("");
              w = ~size[0].indexOf("%") ? ew * parseFloat(size[0]) / 100 : nativeWidth;
              h = ~size[1].indexOf("%") ? eh * parseFloat(size[1]) / 100 : nativeHeight;
            }
          } else {
            size = size.split(" ");
            size.push(nativeHeight);
            w = parseFloat(size[0]) || nativeWidth;
            h = parseFloat(size[1]);
          }
          return {w: Math.ceil(w * scale), h: Math.ceil(h * scale)};
        };
      if (imageUrl) {
        if (!nativeWidth || !nativeHeight) {
          image = new Image();
          image.setAttribute("src", imageUrl.replace(/(^url\("|^url\('|^url\(|"\)$|'\)$|\)$)/gi, ""));
          nativeWidth = image.naturalWidth;
          nativeHeight = image.naturalHeight;
        }
        ew = target.offsetWidth;
        eh = target.offsetHeight;
        if (!nativeWidth || !nativeHeight) {
          console.log("bgSize() failed;", imageUrl, "hasn't loaded yet.");
          nativeWidth = ew;
          nativeHeight = eh;
        }
        size || (size = cs.backgroundSize);
        start = getSize(cs.backgroundSize, 1);
        end = getSize(size, parsedScale);
        data.size = parsedScale === 1 ? size : end.w + "px " + end.h + "px";
        data.style = target.style;
        data.sw = start.w;
        data.cw = end.w - start.w;
        data.sh = start.h;
        data.ch = end.h - start.h;
      }
    },
    render(ratio, data) {
      data.style.backgroundSize = ratio === 1 ? data.size : (data.sw + data.cw * ratio).toFixed(1) + "px " + (data.sh + data.ch * ratio).toFixed(1) + "px";
    }
  };
  gsap.registerPlugin(BackgroundSizePlugin);

  /* ###################### END Background GISAP Cover Scale pLugin  ######################  */

document.addEventListener("DOMContentLoaded", function() 
{
    /* ####################### 100vh Solution ########################## */
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    });
    /* #################### END 100vh Solution ####################### */
});

// ###################################### MOUSE ###################################### */
const pointer = document.querySelector('#mousepointer');

let mouse_cX = 0;
let mouse_cY = 0;
let cursor_cX = 0;
let cursor_cY = 0;
let speed_c = 0.5;

    
function animate_c() 
{
let dist_cX = mouse_cX - cursor_cX;
let dist_cY = mouse_cY - cursor_cY;
    
cursor_cX = cursor_cX + (dist_cX * speed_c);
cursor_cY = cursor_cY + (dist_cY * speed_c);
    
pointer.style.left = cursor_cX-25 + 'px';
pointer.style.top = cursor_cY-25 + 'px';
requestAnimationFrame(animate_c);
}

animate_c();

document.addEventListener('mousemove', (event) => 
{
mouse_cX = event.clientX+19;
mouse_cY = event.clientY+18;
})

function mouse_mo()
{
    all_link = document.querySelectorAll('a');
    
    for(var i=0; i<all_link.length; i++)
    {
        var el=all_link[i];
        el.addEventListener("mouseover", event => 
        {
        pointer.classList.add('active');
        });

        el.addEventListener("mouseout", event => 
        {
        pointer .classList.remove('active');
        });
    }

    all_submit = document.querySelectorAll('input[type="range"]');
    for(var i=0; i<all_submit.length; i++)
    {
        var el=all_submit[i];
        el.addEventListener("mouseover", event => {
            mousepointer.classList.add('active');
        });

        el.addEventListener("mouseout", event => {
            mousepointer.classList.remove('active');
        });
    }
}

mouse_mo();

/* Funzione animazione numeri in Goals */

var contenitore;
let limite;
let time;
let decimi;

function contatore_numero(contenitore, limite, time, decimi, extra)
{
    let conta_n=0;

    var number_tot=setInterval(function () 
    {    
        if(decimi=="")
        {
        conta_n++;
        }else{
        conta_n=conta_n+decimi;
        }
            
        if(conta_n>limite)
        {
        conta_n=limite;    
        }

        document.querySelector(contenitore).innerHTML = conta_n;

        if(conta_n==limite)
        {
        clearInterval(number_tot);    
        document.querySelector(contenitore).innerHTML += extra;
        }
    }, time);
}

/* END Funzione */


setTimeout(function()
{
document.querySelector("body").classList.add('start');
}, 10);

/* ############ GENERAL ############ */
function general()
{
    smoothScroll.stop();

    Splitting();
    
    ScrollTrigger.scrollerProxy(pageContainer, 
    {
        scrollTop(value)
        {
            return arguments.length
            ? smoothScroll.scrollTo(value, {disableLerp: true, duration: 0})
            : smoothScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() 
        {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
            pinType: document.querySelector('#page_cont').style.transform
          ? "transform"
          : "fixed"
    });
    
    ScrollTrigger.addEventListener("refresh", () => smoothScroll.update());
    
    /* ##################### END LOCOMOTIVE + SCROLLTRIGGER SETTING ######################## */


    setTimeout(function()
    {
        document.querySelector("#loading").classList.add('stop');
        document.querySelector("header").classList.add('active');
        document.querySelector("#start").classList.add('active');
        
        if((document.querySelector(".after_start")!= null))
        {
        document.querySelector(".after_start").classList.add('active');
        }

        document.querySelector("body").classList.add('go');
        if((document.querySelector("#start h1>div")!= null))
        {
        document.querySelector("#start h1>div").classList.add('active');
        }

        if((document.querySelector("#skill")!= null))
        {
        home();
        }
    
        if((document.querySelector("#story_astro")!= null))
        {
        mystory();
        }
    
        if((document.querySelector("#awards")!= null))
        {
        goals();
        }
    
        if((document.querySelector("#type_ap")!= null))
        {
        type();
        }
    
        if((document.querySelector("#adaptive_ap")!= null))
        {
        adaptive();
        }

        smoothScroll.update();
 
       
        smoothScroll.start();
        
    }, 1800);
    
}

general();

window.addEventListener('resize', function(event)
    {
        setTimeout(function()
        {
        ScrollTrigger.refresh();
        smoothScroll.update();
        }, 100);
    });

/* ############ HOME ############ */
function home()
{ 
  
    document.querySelector("#skill ul").classList.add('active');
    

    // ###################################### SCROLLTRIGGER ANIMATION HOME  ####################################################

    // ********************************* Home apertura - Fondo cielo *********************************

    let home_start = gsap.timeline
    ({
        scrollTrigger:
        {
        trigger: "#apertura",
        start: "5% top",
        end: "7% top",
        scrub: 1,
        scroller: '#page_cont'
        }
    });

    home_start.to("#artwork", 
    {
        width:"100%"
    });

    // ********************************* Home apertura - Spostamento blocco cielo *********************************
    let home_soazio = gsap.timeline
    ({
        scrollTrigger:
        {
        trigger: "#apertura",
        start: "3% top",
        end: "26% top",
        scrub: 1,
        scroller: '#page_cont'
        }
    });

    home_soazio.to("#artwork", 
    {
        translateY:"0%",
        rotateZ:"0deg"
    });

    // ********************************* Home apertura - Spostamento Astronauta *********************************
    let home_astronauta = gsap.timeline
    ({
        scrollTrigger:
        {
        trigger: "#apertura",
        start: "5% top",
        end: "26% top",
        scrub: 1,
        scroller: '#page_cont'
        }
    });

    home_astronauta.to("#astronauta", 
    {
    translateY:"0%"
    });

    // ********************************* Home apertura - Zoom Astronauta *********************************

    let home_astronauta_2 = gsap.timeline
    ({
        scrollTrigger:{
            trigger: "#apertura",
            start: "40% top",
            end: "100% top",
        scrub:2,
        //markers: true,
        scroller: '#page_cont'
        }
    });

    home_astronauta_2.to("#astronauta img", 
    {
        scale:"80",
        translateY:"-900%",
    });


    // ********************************* Home apertura - Sfondo nero Astronauta *********************************

    let home_astronauta_black = gsap.timeline
    ({
        scrollTrigger:{
            trigger: "#apertura",
            start: "50% top",
            end: "60% top",
        scrub:1,
        //markers: true,
        scroller: '#page_cont'
        }
    });

    home_astronauta_black.to("#sfondo_black", 
    {
        opacity:1

    });

    // ********************************* Home - Root Scritta *********************************

    let images = gsap.utils.toArray('#roots div>span')

        images.forEach((changeOpacity) => {

            const spans = changeOpacity.querySelectorAll("span");
            let root_scritta = gsap.timeline
            ({
                scrollTrigger:{
                trigger: spans,
                scroller: '#page_cont',
                //markers: true,
                scrub:0.3,
                start: "5% 70%",
                end: "top 60%",
                }
            });

            root_scritta.to(spans, 
            {
            opacity: "1",
            duration: 1,
            ease: "none",
            stagger: 1
            });
        });

    // ********************************* Home - Cielo *********************************

    let home_cielo = gsap.timeline
    ({
        scrollTrigger:{
            trigger: "#apertura",
            start: "5% top",
            end: "70% top",
        scrub:2,
        //markers: true,
        scroller: '#page_cont'
        }
    });

    home_cielo.to("#cielo img", 
    {
        scale:"1"
    });

    // ********************************* Home - bomb *********************************

    let home_bomb_1 = gsap.timeline
    ({
        scrollTrigger:{
        trigger: "#blockPEACE",
        start: "top top",
        end: "10% top",
        scrub:1,
        //markers: true,
        scroller: '#page_cont'
        }
    });

    home_bomb_1.to("#bomb", 
    {
    translateY:"-50%"
    });

    function ottieniLarghezzaFinestra() 
    {
    var larghezzaFinestra = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return larghezzaFinestra;
    }

    if (document.querySelector("#bomb"))
    {
    let home_bomb_2 = gsap.timeline
    ({
        scrollTrigger:{
        trigger: "#blockPEACE",
        start: "top top",
        end: "3% top",
        scrub:1,
        //markers: true,
        scroller: '#page_cont'
        }
    });

    home_bomb_2.from("#bomb", 
    {
        onComplete: () => { document.querySelector("#bomb").classList.add('active'); }
    });
    }

    // ********************************* Home - Struggle the fight *********************************

    let fight_p2 = gsap.timeline
    ({
        scrollTrigger:
        {
        trigger: "#fight",
        start: "20% top",
        end: "50% top",
        toggleActions: "restart none none reverse",
        //markers: true,
        scroller: '#page_cont'
        }
    });
 
    fight_p2.to("#fight .hide img", 
    {
        translateY:"-130%",
        transitionDelay:0,
        duration:.5
    })

    ScrollTrigger.saveStyles('#agitatevi');

    let fight_3 = gsap.timeline
    ({
        scrollTrigger:
        {
        trigger: "#fight",
        start: "20% top",
        end: "70% top",
        scrub:1,
        //markers: true,
        scroller: '#page_cont',
        invalidateOnRefresh:true
        },  
    });
 
    fight_3.to("#agitatevi", 
    {
        width:"100vw",
        height:"100vh",
        bottom:"0px"
    });

    ScrollTrigger.saveStyles('#agitatevi imgs');

    let fight_4 = gsap.timeline
    ({
        scrollTrigger:
        {
        trigger: "#fight",
        start: "20% top",
        end: "70% top",
        scrub:1,
        //markers: true,
        scroller: '#page_cont',
        invalidateOnRefresh:true
        }
    });
 
    fight_4.to("#agitatevi img", 
    {
    scale:3
    });
    
    // ********************************* Home - Logo *********************************

    ScrollTrigger.saveStyles('header #logo');

    let home_logo = gsap.timeline
    ({
        scrollTrigger:
        {
            trigger: "#start",
            start: "-0.1% top",
            end: "80% top",
            scrub:1,
            scroller: '#page_cont',
            invalidateOnRefresh:true,
            force3D: false
            
        }
    });

    home_logo.to("header #logo svg", 
    {
        width:"100%"
    })

    // ********************************* Home - Brand *********************************

    let images_t = gsap.utils.toArray('#brand_col .left li')

        images_t.forEach((item, index) => {

            let brand_box = gsap.timeline
            ({
                scrollTrigger:{
                trigger: item,
                scroller: '#page_cont',
                //markers: true,
                scrub:1,
                start: "10% center",
                end: "200% top",
                }
            });

            brand_box.to(item, 
            {
                rotate:"-8deg"
            });
        });

        let images_r = gsap.utils.toArray('#brand_col .right li')

        images_r.forEach((item, index) => {

            let brand_box_r = gsap.timeline
            ({
                scrollTrigger:{
                trigger: item,
                scroller: '#page_cont',
                //markers: true,
                scrub:1,
                start: "10% center",
                end: "200% top",
                }
            });

            brand_box_r.to(item, 
            {
                rotate:"8deg"
            });
        });

        let brand_left = gsap.timeline
        ({
            scrollTrigger:{
            trigger: "#brand_col",
            scroller: '#page_cont',
            //markers: true,
            scrub:1,
            start: "top center",
            end: "200% top",
            }
        });

        brand_left.to("#brand_col .left", 
        {
        rotate:"-3deg"
        });

        let brand_right = gsap.timeline
        ({
            scrollTrigger:{
            trigger: "#brand_col",
            scroller: '#page_cont',
            //markers: true,
            scrub:1,
            start: "top center",
            end: "200% top",
            }
        });

        brand_right.to("#brand_col .right", 
        {
            rotate:"3deg"
        });

        let brand_center = gsap.timeline
        ({
            scrollTrigger:{
            trigger: "#brand_col",
            scroller: '#page_cont',
            //markers: true,
            scrub:1,
            start: "top center",
            end: "200% top",
            }
        });

        brand_center.to("#brand_col .center", 
        {
        translateY:"-10%"
        });

    /* ########### END SCROLLTRIGGER ANIMATION HOME ########################## */
}
/* ############ END HOME ############ */

/* ############ My Story ############ */

function mystory()
{
    // ********************************* Mystory - Begin *********************************

    let foto_begin = gsap.timeline
    ({
        scrollTrigger:
        {
            trigger: "#begin_foto",
            start: "10% top",
            end: "25% top",
            scrub: 1,
            //markers: true,
            scroller: '#page_cont'
        }
    });
 
    foto_begin.to("#img_begin3", 
    {
        rotateZ:"-60deg",
        translateX:"-180%",
        translateY:"40%",
        opacity:0,
    });

    let foto_begin_2 = gsap.timeline
    ({
        scrollTrigger:
        {
            trigger: "#begin_foto",
            start: "30% top",
            end: "45% top",
            scrub: 1,
            //markers: true,
            scroller: '#page_cont'
        }
    });
 
    foto_begin_2.to("#img_begin2", 
    {
        rotateZ:"60deg",
        translateX:"180%",
        translateY:"40%",
        opacity:0,
    });

    let foto_begin_3 = gsap.timeline
    ({
        scrollTrigger:
        {
            trigger: "#begin_foto",
            start: "50% top",
            end: "65% top",
            scrub: 1,
            //markers: true,
            scroller: '#page_cont'
        }
    });
 
    foto_begin_3.to("#img_begin1", 
    {
        rotateZ:"-60deg",
        translateX:"-180%",
        translateY:"40%",
        opacity:0,
    });
    
    // ********************************* Mystory - Meedori *********************************
    let foto_meedori = gsap.timeline
    ({
        scrollTrigger:
        {
            trigger: "#begin_foto",
            start: "70% top",
            end: "100% top",
            scrub: 1,
            //markers: true,
            scroller: '#page_cont'
        }
    });

    foto_meedori.from("#meedori_foto", 
    {
        backgroundSize:
        {
            scale:1.5, 
            nativeWidth:1920,
            nativeHeight:1280
        }, 
    });  
 
    foto_meedori.to("#meedori_foto", 
    {
        backgroundSize:
        {
            scale:1, 
            nativeWidth:1920,
            nativeHeight:1280
        }, 

    });

    // get size of background with size cover
    let bgSize = BackgroundSizePlugin.getSize("#meedori_foto",
    {
        size:"cover",
        nativeWidth:"1200",
        nativeHeight:"1600"
    })

    let foto_meedori_2 = gsap.timeline
    ({
        scrollTrigger:
        {
            trigger: "#begin_foto",
            start: "70% top",
            end: "90% top",
            scrub: 1,
            //markers: true,
            scroller: '#page_cont'
        }
    });

    foto_meedori_2.to("#meedori_foto", 
    {
        maskSize:"1400vh",
    }); 

    // ********************************* Mystory - K95 *********************************

    let k95_statua = gsap.timeline
    ({
        scrollTrigger:
        {
            trigger: "#studiok95",
            start: "-10% top",
            end: "10% top",
            //markers: true,
            scroller: '#page_cont',
            scrub: 1,
        }
    });

    k95_statua.to("#statua_kk", 
    {
    translateY:"-50%"
    }); 

    let k95_statua_2 = gsap.timeline
    ({
        scrollTrigger:
        {
            trigger: "#studiok95",
            start: "-10% top",
            end: "40% top",
            //markers: true,
            scroller: '#page_cont',
            scrub: 1,
        }
    });

    k95_statua_2.to("#k95_statua", 
    {
    translateY:"-50%"
    }); 

    let k95_mystory = gsap.timeline
    ({
        scrollTrigger:
        {
            trigger: "#philosophy_k95",
            start: "20% top",
            end: "40% top",
            //markers: true,
            scroller: '#page_cont',
            toggleActions: "restart none none reverse",
        }
    });

    k95_mystory.to("#words_k95 div>span", 
    {
        translateY:"-100%",
        duration:1
    }); 


    
    let k95_mystory_2 = gsap.timeline
    ({
        scrollTrigger:
        {
            trigger: "#philosophy_k95",
            start: "40% top",
            end: "60% top",
            toggleActions: "restart none none reverse",
            scroller: '#page_cont'
        }
    });

    k95_mystory_2.to("#words_k95 div>span", 
    {
        translateY:"-200%",
        duration:1
    }); 

    let k95_mystory_3 = gsap.timeline
    ({
        scrollTrigger:
        {
            trigger: "#philosophy_k95",
            start: "60% top",
            end: "80% top",
            toggleActions: "restart none none reverse",
            scroller: '#page_cont'
        }
    });

    k95_mystory_3.to("#words_k95 div>span", 
    {
        translateY:"-300%",
        duration:1
    }); 


    let k95_mystory_4 = gsap.timeline
    ({
        scrollTrigger:
        {
        trigger: "#philosophy_k95",
        start: "10% top",
        end: "100% top",
        scrub: 1,
        scroller: '#page_cont'
        }
    });

    k95_mystory_4.to("#k95_foto", 
    {
        translateY:"-100%",
    }); 


}  
/* ############ MYSTORY END ############ */ 

/* ############ GOALS ############ */
function goals()
{
    // ************** Tabella premi *******************

    document.querySelector('.table_award.open>div:last-child').style.maxHeight = document.querySelector('.table_award.open>div:last-child').scrollHeight + "px";
    all_award = document.querySelectorAll('.table_award>div>.icon');
    const img_aw_show = document.querySelector('#img_aw');

    
    
    setTimeout(function()
    {
    smoothScroll.update();
    smoothScroll.on("call", callValue => 
    {
        if (callValue === "number_design") 
        {
        contatore_numero('#numbers_car div:first-child>span:first-child', 5, 100, "", "");
        contatore_numero('#numbers_car div:nth-child(2)>span:first-child', 29, 30, "", "");
        contatore_numero('#numbers_car div:nth-child(3)>span:first-child', 58, 20, "", "");
        } 
    });
    },700);
        
    all_award.forEach(insideBox => 
    {
        insideBox.addEventListener("click", function(e)
        {
            if(insideBox.parentNode.parentNode.classList.contains('open'))
            {
                insideBox.parentNode.parentNode.classList.remove('open');
                insideBox.parentNode.nextElementSibling.style.maxHeight = 0;
                setTimeout(function()
                {
                img_aw_show.classList.remove('show');
                }, 700);
            }
            else
            {
                insideBox.parentNode.parentNode.classList.add('open');
                insideBox.parentNode.nextElementSibling.style.maxHeight = insideBox.parentNode.nextElementSibling.scrollHeight + "px";
            } 

            setTimeout(function()
            {
            smoothScroll.update();
            },1000);

            e.preventDefault();
        });
    });

    window.addEventListener('resize', () => 
    {
        all_open_close = document.querySelectorAll('.table_award.open>div:last-child');

        all_open_close.forEach(insideBox => 
        {
            insideBox.style.maxHeight = insideBox.scrollHeight + "px";
        });

    });

    all_img_award = document.querySelectorAll('.grid_32');    
    const img_aw_src = document.querySelector('#img_aw img');

    all_img_award.forEach(insideBox => 
    {
        insideBox.addEventListener('mouseenter', function() 
        {
            var menuItem = insideBox;
                
            var menuItemTOP = menuItem.offsetTop;

            img_aw_show.style.top = menuItem.offsetTop + 'px';

            setTimeout(function()
            {
            img_aw_show.classList.add('show');
            img_aw_src.src=insideBox.dataset.imgaw;
            },300);
        });

        insideBox.addEventListener('mouseleave', function() 
        {
            img_aw_show.classList.remove('show');
        });
        
    });

    document.querySelector('#awards').addEventListener('mouseleave', function() 
    {
        img_aw_show.classList.remove('show');
    });
        
}
/* ############ END GOALS ############ */

/* ############ TYPE ############ */
function type()
{
    // ************** Scrolltrigger Type *******************

    let baloon = gsap.timeline
    ({
        scrollTrigger:
        {
        trigger: "#type_ap",
        start: "20% top",
        end: "100% top",
        scrub:1,
        //markers: true,
        scroller: '#page_cont'
        }
    });

    baloon.to("#type_g>div:first-child picture", 
    {
      
        translateY:"-200%",
        rotate:"-20deg"
    })

    let baloon2 = gsap.timeline
    ({
        scrollTrigger:
        {
        trigger: "#type_ap",
        start: "20% top",
        end: "100% top",
        scrub:1,
        //markers: true,
        scroller: '#page_cont'
        }
    });

    baloon2.to("#type_g>div:nth-child(2) picture", 
    {
        translateY:"-200%",
        rotate:"10deg"
    })

    let baloon3 = gsap.timeline
    ({
        scrollTrigger:{
        trigger: "#type_ap",
        start: "20% top",
        end: "100% top",
        scrub:1,
        //markers: true,
        scroller: '#page_cont'
        }
    });

    baloon3.to("#type_g>div:nth-child(3) picture", 
    {
        translateY:"-200%",
        rotate:"20deg"
    })

    let baloon4 = gsap.timeline
    ({
        scrollTrigger:{
        trigger: "#type_ap",
        start: "20% top",
        end: "100% top",
        scrub:1,
        //markers: true,
        scroller: '#page_cont'
        }
    });

    baloon4.to("#type_g>div:nth-child(4) picture", 
    {
        translateY:"-200%",
        rotate:"40deg"
    })

    let sky_stelvio = gsap.timeline
    ({
        scrollTrigger:
        {
        trigger: "#stelvio",
        start: "top top",
        end: "100% top",
        scrub:2,
        //markers: true,
        scroller: '#page_cont'
        }
    });


    sky_stelvio.to(".font_artwork .fondo img", 
    {
        scale:"1"
    })
}
/* ############ END TYPE ############ */

/* ############ ADAPTIVE ############ */

function adaptive()
{

    let adaptive_long = gsap.timeline
    ({
        scrollTrigger:
        {
        trigger: "#adaptive_ap",
        start: "10% top",
        end: "60% top",
        scrub:1,
        //markers: true,
        scroller: '#page_cont'
        }
    });

    adaptive_long.to("#sp_center", 
    {
        width:"16%"
    })    

    let adaptive_puf = gsap.timeline
    ({
        scrollTrigger:
        {
        trigger: "#cont_puf",
        start: "-70% top",
        end: "70% top",
        scrub:1,
        //markers: true,
        scroller: '#page_cont'
        }
    });

    adaptive_puf.to("#cont_puf_sf img", 
    {
        scale:"1"
    })    
}
// ###################################### END MOUSE ###################################### */

// ###################################### OPEN/CLOSE MENU MOBILE ###################################### */

const nav = document.querySelector('#nav_mobile');
const botton = document.querySelector('#nav_bot_mob');
const header = document.querySelector('header');

document.querySelector('#nav_bot_mob').addEventListener("click", function(e)
{    
    botton.classList.toggle('open');
    nav.classList.toggle('open');
    header.classList.toggle('menu_open');

    setTimeout(function()
    {
    document.querySelector("#nav_mobile nav ul").classList.toggle('active');
    }, 300);

    e.preventDefault();

});
// ###################################### END OPEN/CLOSE MENU MOBILE ###################################### */

// ###################################### BARBA ###################################### */
var current
barba.init({
	
    debug: true,
    
    transitions: 
    [{
        name: 'fade',
        before({ current, next, trigger }) 
        {
            const done = this.async();
            document.querySelector('#load_page').classList.add('show');

            setTimeout(function () {
                document.querySelector('#logo').classList.add('block');
                botton.classList.remove('open');
                nav.classList.remove('open');
                
                if((document.querySelector("header li.attivo")!= null))
                {
                document.querySelector('header li.attivo').classList.remove('attivo');
                document.querySelector('#nav_mobile li.attivo').classList.remove('attivo');
                }

                document.querySelector("#nav_mobile nav ul").classList.remove('active');
                document.querySelector("header").classList.remove('menu_open');
                done();
                smoothScroll.destroy();
            }, 800);
        },

        leave({ current, next, trigger }) {},
        afterLeave({ current, next, trigger }) 
        {
            current=next.namespace
        
            if((current!="home")&&(current!="p404"))
            {
            document.querySelector('#'+current).classList.add('load_attivo');
            }
            else
            {
            document.querySelector('#logo_h').classList.add('attivo');    
            }
        },  
        beforeEnter({ current, next, trigger }) {},
        enter({ current, next, trigger }) 
        {
        smoothScroll.init();
        },

		after({current, next, trigger }) 
        {     
            current=next.namespace

            

            if(current!="p404")
            {
            document.querySelector('header li[data-name-b="'+current+'"]').classList.add('attivo');
            document.querySelector('#nav_mobile li[data-name-b="'+current+'"]').classList.add('attivo');
            }

            if((document.querySelector(".after_start")!= null))
            {
            document.querySelector(".after_start").classList.add('active');
            }

            document.querySelector("#start").classList.add('active');
            document.querySelector("#start").classList.add('active_l');

            setTimeout(function () 
            {
                document.querySelector('#load_page').classList.add('hide');
                setTimeout(function () 
                {
                    document.querySelector('#load_page').classList.remove('hide');

                    if((current!="home")&&(current!="p404"))
                    {
                    document.querySelector('#'+current).classList.remove('load_attivo');
                    }else
                    {
                    document.querySelector('#logo_h').classList.remove('attivo'); 
                    }
                    
                    document.querySelector('#load_page').classList.remove('show');
                   
                }, 1000);
            
            }, 1000);
 
            if((document.querySelector("#skill")!= null))
            {
            document.querySelector('#logo').classList.remove('block');   
            }else
            {
            document.querySelector('body').classList.remove('home');
            }
            
            /* Destroy scrolltrigger e Locmotive*/
            let triggers = ScrollTrigger.getAll();
            triggers.forEach( trigger => 
            {			
            trigger.kill();
            });
            
            
            /* END Destroy scrolltrigger e Locomotive*/
            
            
            general();
            mouse_mo();
              
        },
    }]
});
// ################ end barba.js ##################

