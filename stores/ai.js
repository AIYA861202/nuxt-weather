import { defineStore } from 'pinia'
import { find } from 'lodash-es'
export const useAiStore = defineStore('ai', {
  state: () => ({
    chatMessages: {
      defaultReply: {
        keywords: ['嗨', '你好', '哈囉'],
        wordReply:
          '很抱歉，您的問題目前超出我的知識範圍，建議您可參考竹北市公所各單位聯絡資訊，由專人為您協助處理！我也會持續學習，希望未來能提供更多幫助給您喔！😊'
      },

      chatMessages: [
        {
          keywords: ['嗨', '你好', '哈囉'],
          wordReply: '您好，需要什麼服務。'
        },
        {
          keywords: ['天氣', '氣象', '下雨'],
          wordReply: '今天天氣晴，氣溫 28°C。'
        },
        {
          keywords: ['垃圾車', '收垃圾', '垃圾'],
          wordReply: '竹北市垃圾車路線與時刻表，您可參考市公所官網公告。'
        },
        {
          keywords: ['停車場', '停車資訊', '哪裡停車'],
          wordReply: '您可以使用竹北市智慧停車資訊平台查詢附近停車場。'
        },
        {
          keywords: ['戶政', '戶籍', '身份證'],
          wordReply: '戶政相關業務可至竹北戶政事務所辦理，營業時間為週一至週五 8:00-17:00。'
        },
        {
          keywords: ['護照', '出國', '旅行證件'],
          wordReply: '護照相關業務由外交部領事事務局辦理，需前往新竹辦事處申辦。',
          urlGroup: [
            {
              title: '護照辦理資訊',
              url: [
                {
                  title: '外交部領事事務局官網',
                  url: 'https://www.boca.gov.tw/'
                },
                {
                  title: '新竹辦事處聯絡資訊',
                  url: 'https://www.fnp.gov.tw/fnpc/singlehtml/a8bc59104b6a408b853d71273dfe3b49?cntId=4401a8ff944344f08573ff69ac503b04'
                }
              ]
            },
            {
              title: '出國前準備',
              url: [
                {
                  title: '常見旅行證件問答',
                  url: '/'
                },
                {
                  title: '健檢與疫苗建議',
                  url: '/'
                },
                {
                  title: '健檢與疫苗建議',
                  url: '/'
                }
              ]
            },
            {
              title: '其他旅遊資源',
              url: [
                {
                  title: '交通部觀光署',
                  url: '/'
                },
                {
                  title: '出入境須知',
                  url: '/'
                }
              ]
            }
          ]
        },
        {
          keywords: ['活動', '市公所活動', '演唱會', '展覽'],
          wordReply: '近期竹北市公所舉辦的活動資訊可參考官網最新消息公告喔！',
          urlGroup: [
            {
              title: '便民服務',
              url: [
                {
                  title: '行動報修',
                  url: '/'
                },
                {
                  title: '下載專區',
                  url: '/'
                }
              ]
            },
            {
              title: '生活服務',
              url: [
                {
                  title: '免費交通',
                  url: '/'
                },
                {
                  title: '垃圾車',
                  url: '/'
                }
              ]
            }
          ]
        },
        {
          keywords: ['市長', '市長是誰'],
          wordReply: '竹北市市長目前為 ○○○，如需了解施政內容，可參考市長專區。'
        },
        {
          keywords: ['交通', '公車', '捷運'],
          wordReply: '公車及交通資訊可查詢「竹竹苗區域公車」官方網站。'
        },
        {
          keywords: ['急難救助', '補助', '申請'],
          wordReply: '急難救助或相關補助申請，可至竹北市公所社會課洽詢辦理。'
        }
      ]
    }
  }),
  actions: {
    getAiReply(userInput) {
      // 先找 chatMessages 裡有沒有符合
      const match = find(this.chatMessages.chatMessages, (item) =>
        item.keywords.some((keyword) => userInput.includes(keyword))
      )

      // 如果有 match，回 wordReply，否則回 defaultReply
      return match || this.chatMessages.defaultReply
    }
  }
})
