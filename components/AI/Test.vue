<script setup>
import aiIcon from '~/assets/images/icon/ai_serve.png'
// useHead({
//   link: [
//     {
//       rel: 'stylesheet',
//       href: 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css'
//     }
//   ],
//   script: [
//     {
//       src: 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js'
//     }
//   ]
// })
</script>

<template>
  <!-- 自定義 Icon 按鈕 -->
  <!-- <button class="custom-chat-button" @click="toggleChat">
    <img :src="aiIcon" alt="AI 智能客服" />
  </button> -->
  <df-messenger
    project-id="zhubei-461803"
    agent-id="2b832441-e550-494f-8ccd-c14e56406413"
    language-code="zh-tw"
    max-query-length="-1"
    expanded="false"
  >
    <df-messenger-chat-bubble
      chat-title="竹北 AI 智能客服"
      chat-icon="https://res.cloudinary.com/dmylxasrv/image/upload/v1749460025/chat_gnehgg.png"
      placeholder-text="請輸入您的問題"
      bot-writing-text="思考中..."
    >
    </df-messenger-chat-bubble>
  </df-messenger>
</template>

<style lang="scss" scoped>
df-messenger {
  z-index: 999;
  position: fixed;
  --df-messenger-default-font-size: 0.875rem;
  --df-messenger-internal-input-font-size: 1rem;

  --df-messenger-font-color: #393939;
  --df-messenger-font-family: Google Sans;
  --df-messenger-chat-background: #ffefef;
  --df-messenger-message-user-background: #ffefef;
  --df-messenger-message-inline-citation-background: #ffefef;
  --df-messenger-send-icon-color-hover: #ffefef;
  --df-messenger-send-icon-color-active: #ffb8ae;
  --df-messenger-input-background: #871200;
  --df-messenger-message-user-background: #ffb8ae;
  --df-messenger-chat-scroll-button-background: #ffb8ae;
  --df-messenger-chat-function-call-button-background: #ffb8ae;
  --df-messenger-titlebar-button-color-active: #ffb8ae;
  --df-messenger-focus-color-contrast: #ffb8ae;
  --df-messenger-chat-bubble-background: #ffb8ae;
  --df-messenger-default-focus-color: #984539;
  --df-messenger-message-bot-background: #fff;
  --df-messenger-link-border: none;
  --df-messenger-chat-border: none;
  --df-messenger-primary-color: #871200;
  --df-messenger-titlebar-background: #871200;
  --df-messenger-default-primary-color: #871200;
  --df-messenger-titlebar-font-color: #fff;
  --df-messenger-titlebar-icon-font-color: #fff;
  --df-messenger-input-box-focus-border: 2px dashed #ffb8ae;
  --df-messenger-internal-input-font-size: 16px;
  --df-messenger-link-padding: 0;
  right: 5%;
  bottom: 5%;
  transform: translate(0%, 0%);
  --df-messenger-chat-window-box-shadow: 0 0px 8px rgba(0, 0, 0, 0.25);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 50px;
  --df-messenger-chat-border-radius: 10px;
  --df-messenger-message-internal-border-radius: 0px;
}

df-messenger-chat-bubble > svg {
  display: none !important;
}

// .custom-chat-button {
//   z-index: 999;
//   position: fixed;
//   bottom: 16px;
//   right: 16px;
//   background: transparent;
//   border: none;
//   cursor: pointer;
// }
</style>
