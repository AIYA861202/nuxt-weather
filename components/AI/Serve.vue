<script setup>
import aiIcon from '~/assets/images/icon/ai_serve.png'
import logo from '~/assets/images/icon/logo-white.png'

const { $aiStore } = useNuxtApp()
const chatBoxRef = ref(null)
// 初始陣列
const chatMessages = ref([
  {
    role: 'ai',
    message: {
      wordReply:
        'Hi！我是竹北市公所的 AI 小精靈，目前持續學習進步中～市政服務、生活資訊、活動消息，您都可以試著問我看看喔！'
    }
  }
])
watch(
  chatMessages,
  async () => {
    await nextTick()
    if (chatBoxRef.value) {
      chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight
    }
  },
  { deep: true }
)
// v-model 綁 input
const userInput = ref('')

// 傳送訊息函式
const sendMessage = () => {
  const input = userInput.value.trim()
  if (!input) return

  chatMessages.value.push({
    role: 'user',
    message: input
  })

  const aiReply = $aiStore.getAiReply(input)

  setTimeout(() => {
    chatMessages.value.push({
      role: 'ai',
      message: aiReply
    })
  }, 500)

  userInput.value = ''
}
</script>

<template>
  <div class="ai-container">
    <!-- Button trigger modal -->
    <button type="button" data-bs-toggle="modal" data-bs-target="#aiModal">
      <img :src="aiIcon" alt="AI 智能客服" />
    </button>

    <!-- Modal -->
    <div
      id="aiModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="aiModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="aiModalLabel" class="modal-title fs-5">
              <img :src="logo" alt="竹北市公所-Logo" />
            </h1>
            <button
              type="button"
              title="關閉"
              class="close-btn"
              data-bs-dismiss="modal"
              :aria-label="`關閉`"
            >
              <!-- <Icon name="streamline:delete-1" /> -->
              <Icon name="IconParkDown" />
            </button>
          </div>
          <div ref="chatBoxRef" class="modal-body">
            <ul class="chat-box">
              <li
                v-for="(msg, index) in chatMessages"
                :key="index"
                :class="['chat-message', msg.role]"
              >
                <!-- AI 有小頭像 -->
                <template v-if="msg.role === 'ai'">
                  <img :src="aiIcon" alt="AI 智能客服" />
                  <div class="message-content">
                    <p>{{ msg.message.wordReply }}</p>
                  </div>

                  <template v-if="msg.message.urlGroup">
                    <img :src="aiIcon" alt="AI 智能客服" />
                    <div class="url-content">
                      <div>
                        <swiper
                          class="mySwiper"
                          style="min-width: 0"
                          :slides-per-view="1.2"
                          space-between="9"
                        >
                          <swiper-slide
                            v-for="(item, i) in msg.message.urlGroup"
                            :key="`urlGroup${i}`"
                            class="slide"
                          >
                            <div class="url-group">
                              <div>
                                <span>{{ item.title }}</span>
                              </div>
                              <ul>
                                <li v-for="(link, j) in item.url" :key="`link${j}`">
                                  <NuxtLink target="_blank" :title="link.title" :to="link.url">{{
                                    link.title
                                  }}</NuxtLink>
                                </li>
                              </ul>
                            </div>
                          </swiper-slide>
                        </swiper>
                      </div>
                    </div>
                  </template>
                </template>

                <!-- User 沒有頭像，純文字 -->
                <template v-else>
                  <div class="message-content">{{ msg.message }}</div>
                </template>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <div class="input-group mb-3">
              <input
                v-model="userInput"
                type="text"
                class="form-control"
                placeholder="歡迎詢問小精靈任何問題...."
                aria-label="歡迎詢問小精靈任何問題...."
                aria-describedby="button-addon2"
                @keyup.enter="sendMessage"
              />
              <button
                id="button-addon2"
                class="btn btn-outline-secondary submit-btn"
                type="button"
                @click="sendMessage"
              >
                <Icon name="IcRoundSend" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ai-container {
  & > button {
    position: fixed;
    right: 5%;
    bottom: 5%;
    transform: translate(0%, 0%);
    z-index: 1050;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    @include md {
      right: 1%;
      bottom: 1%;
    }
    img {
      width: 60px; // 可以調整
      height: 60px;
    }
    &:hover {
      transform: translateY(-10px);
    }
  }

  .modal-dialog {
    position: fixed;
    bottom: 0px;
    right: 0px;
    margin: 0px;
    width: 100%;
    max-width: 450px;
  }
  .modal.fade .modal-dialog {
    transition:
      transform 0.3s ease-out,
      opacity 0.3s ease-out;
    transform: translate(0, 50px);
    opacity: 0;
  }

  .modal.fade.show .modal-dialog {
    transform: translate(0, 0);
    opacity: 1;
  }
  .modal-header {
    justify-content: space-between;
    .close-btn {
      svg {
        color: white;
        width: 24px;
        height: 24px;
      }
    }
    background-color: $main;
    padding: 13px 15px;
  }
  .modal-footer {
    padding: 13px 15px;
    background-color: $main;
    overflow: hidden;
    .submit-btn {
      margin: 0;
      min-width: 50px;
      background-color: white;
      border: none;
      outline-offset: -5px;
      svg {
        color: #ce4130;
        width: 24px;
        height: 24px;
      }
    }
    .input-group {
      border-radius: 5px;
      overflow: hidden;
      input {
        outline-offset: -5px;
      }
    }
  }
  .modal-body {
    background-color: #ffefef;
    max-height: calc(100vh - 30vh);
    overflow-y: scroll;

    @include md {
      max-height: calc(100vh - 140px);
    }
  }

  .chat-message {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 8px;
    align-items: center;

    max-width: 100%;
    width: auto;
    padding: 10px;
  }

  /* 使用者 */
  .chat-message.user {
    background-color: #e5e5e5;
    color: #4f4f4f;

    align-self: flex-end;
    max-width: 80%;
    border-radius: 10px 10px 0px 10px;
    box-shadow: 0px 3px 10px 0px rgba(black, 0.25);
  }

  /* AI */
  .chat-message.ai {
    column-gap: 9px;
    align-items: start;
    .message-content {
      width: auto;
      margin-right: auto;
      max-width: 80%;
      background-color: #eff2f7;
      color: #4f4f4f;
      align-self: flex-start;
      border-radius: 0 10px 10px 10px;
      padding: 10px;
      box-shadow: 0px 3px 10px 0px rgba(black, 0.25);
    }
    img {
      width: 50px;
      height: 50px;
    }
    .url-content {
      display: grid;
      > div {
        min-width: 0;
      }
      img {
        width: 50px;
        height: 50px;
      }
    }
  }

  .swiper-slide {
    padding: 10px;
  }
  /* 預設是綠色 */
  .url-group {
    box-shadow: 0px 3px 10px 0px rgba(black, 0.25);
    border-radius: 10px 10px 10px 10px;
    overflow: hidden;

    div {
      background-color: #08617b; /* 綠色 */
      padding: 16px 0px;
      text-align: center;
      span {
        color: white;
        font-size: 1.125rem;
      }
    }

    ul {
      background-color: white;
      padding: 25px 16px;
      display: grid;
      row-gap: 15px;

      a {
        width: 100%;
        border-radius: 5px;
        display: block;
        padding: 8px 0px;
        text-align: center;
        font-size: 0.9375rem;
        border: 1px solid #08617b;
        color: #08617b;
        transition: all 0.3s ease;

        &:hover {
          background-color: #d4eef5;
        }
      }
    }
  }

  /* 偶數 slide 裡面的 url-group 改成橘色 */
  .swiper-slide:nth-child(even) .url-group {
    div {
      background-color: #dc602e;
    }

    ul a {
      border-color: #dc602e;
      color: #dc602e;

      &:hover {
        background-color: #ffe0b2;
      }
    }
  }
  .chat-box {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
  }
}
</style>
