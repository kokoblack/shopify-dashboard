const notification = document.getElementById("notificaton");
const notificationPanel = document.getElementById("notificationPanel");
const profile = document.getElementById("profile");
const profilePanel = document.getElementById("profilePanel");
const admin = document.getElementsByClassName("admin");
const closeTrial = document.getElementById("closeTrial");
const closeTrialButton = document.getElementById("closeTrialButton");
const toggleGuide = document.getElementById("toggleGuide");
const toggleShowGuide = document.getElementsByClassName("toggleShowGuide");
const taskCounter = document.getElementById("taskCounter");
const range = document.getElementById("range");
const setupGuide = document.getElementById("setupGuide");
const tickGuide1 = Array.from(document.getElementsByClassName("tickGuide1"));
const tickGuide2 = Array.from(document.getElementsByClassName("tickGuide2"));
const tickGuide3 = Array.from(document.getElementsByClassName("tickGuide3"));
const icon1 = Array.from(
  document.getElementsByClassName("setup_guide-tasks_icon1")
);
const icon2 = Array.from(
  document.getElementsByClassName("setup_guide-tasks_icon2")
);
const showGuide = Array.from(
  document.getElementsByClassName("setup_guide-tasks_click")
);
const showGuideView = Array.from(
  document.getElementsByClassName("setup_guide-tasks_view")
);
const getActive = Array.from(document.getElementsByClassName("getActive"));

toggleGuide.addEventListener("click", function () {
  setupGuide.classList.toggle("close");
  toggleShowGuide[0].classList.toggle("show");
  toggleShowGuide[1].classList.toggle("close");
});

const showpanel = (button, panel, panel2, button2) => {
  button.classList.toggle("bgColor");
  panel.classList.toggle("show");

  const checkPanel = panel2.classList.contains("show");

  if (checkPanel) {
    panel2.classList.remove("show");
    button2.classList.remove("bgColor");
  }
};

notification.addEventListener("click", function () {
  showpanel(notification, notificationPanel, profilePanel, profile);
});

profile.addEventListener("click", function () {
  showpanel(profile, profilePanel, notificationPanel, notification);
});

closeTrialButton.addEventListener("click", function () {
  closeTrial.classList.add("close");
});

for (const dom of admin) {
  dom.addEventListener("click", function () {
    location.assign("https://admin.shopify.com");
  });
}

icon1.forEach((dom, i) => {
  dom.addEventListener("mouseover", function () {
    icon1[i].classList.add("close");
    icon2[i].classList.add("show");
  });
});

icon2.forEach((dom, i) => {
  dom.addEventListener("mouseout", function () {
    icon1[i].classList.remove("close");
    icon2[i].classList.remove("show");
  });
});

showGuide.forEach((dom, i) => {
  dom.addEventListener("click", function () {
    if (!showGuideView[i].classList.contains("close")) {
      showGuideView[i].classList.add("close");
      getActive[i].classList.remove("active");
    } else {
      const index = showGuideView.map((dom) => {
        if (!dom.classList.contains("close")) {
          return (dom = false);
        } else {
          return (dom = true);
        }
      });
      const getIndex = index.findIndex((e) => e === false);
      if (getIndex !== -1) {
        showGuideView[getIndex].classList.add("close");
        getActive[getIndex].classList.remove("active");
      }
      showGuideView[i].classList.remove("close");
      getActive[i].classList.add("active");
    }
  });
});

// range track
let guides = [0, 0, 0, 0, 0];
let counter = 0;
// let bool = false
const getGuide = Array.from(
  document.getElementsByClassName("setup_guide-tasks_icon_container")
);

getGuide.forEach((dom, i) => {
  dom.addEventListener("click", function () {
    guides[i] = guides[i] === 0 ? 1 : 0;
    counter = guides.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    if (
      tickGuide3[i].classList.contains("close") &&
      tickGuide2[i].classList.contains("close") &&
      tickGuide1[i].classList.contains("close")
    ) {
      icon1[i].classList.add("close");
      icon2[i].classList.add("close");
      setTimeout(() => {
        tickGuide1[i].classList.remove("close");
      }, 150);
      setTimeout(() => {
        tickGuide1[i].classList.add("close");
        tickGuide2[i].classList.remove("close");
      }, 300);
      setTimeout(() => {
        tickGuide2[i].classList.add("close");
        tickGuide3[i].classList.remove("close");
      }, 450);
    } else {
      icon1[i].classList.remove("close");
      icon2[i].classList.remove("close");
      tickGuide1[i].classList.add("close");
      tickGuide2[i].classList.add("close");
      tickGuide3[i].classList.add("close");
    }

    taskCounter.innerText = `${counter} / 5 completed`;
    range.style.backgroundSize = `${counter * 20}%`;
  });
});
