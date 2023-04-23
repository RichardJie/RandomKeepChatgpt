// ==UserScript==
// @name         ChatGPT Auto Refresh
// @namespace    ChatGPT-Intelligant-auto-refresh
// @version      1
// @description  Refresh the ChatGPT page for you at regular intervals of 30 seconds when and only when you are not active on the ChatGPT page, or not if you are currently on the ChatGPT page。
// @match        https://chat.openai.com/*
// @grant        none
// @author       yammi@yammi.cafe
// ==/UserScript==

(function() {
  let style = `
  .badge {
    width: auto
    height: 20px;
    padding: 12px;
    margin: 5px 0px;
    color: #F9F7F3;
    border-radius: 4px;
    background-color: #0FA3B1;
    background-blend-mode: normal;
    font-family: Viga;
    font-size: 11px;
    font-weight: 400;
    
    text-align: center;
  }
  .badge p {
    line-height: 18px;
  }
  `
  const parentElement = document.evaluate(
    '//*[@id="__next"]/div[2]/div[1]/div/div/nav/a',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue.parentElement;

  const newDiv = document.createElement("div");
  newDiv.className = 'badge'
  newDiv.innerHTML = `<style>${style}</style><p>RandomKeepChatgpt is running</p><p>Your ChatGPT will remain active.</p>`;

  parentElement.insertBefore(newDiv, parentElement.firstChild);

  let refreshTimer = null;

  if (location.hostname === "chat.openai.com") {
    const newP = document.createElement("p");
    newP.textContent = `最近刷新时间：${new Date().toLocaleTimeString()}`;

    newDiv.appendChild(newP);

    checkVisibility();
  }

  function checkVisibility() {
    
      refreshTimer = setTimeout(() => {
        if (document.visibilityState === "hidden") {
        location.reload();
        checkVisibility();
		}
        else {
        clearInterval(refreshTimer);
        setTimeout(checkVisibility, 1000);
		}
      }, Math.floor(Math.random() * 20000) + 20000); // Random 20-40 seconds
     
    // 
    
  }

  window.addEventListener("beforeunload", () => {
    clearInterval(refreshTimer);
  });
})();
  
