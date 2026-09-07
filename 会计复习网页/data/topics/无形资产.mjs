// 此文件由专题维护；不要把所有卡片重新合并到单一文件。
export default [
  {
    "id": "intangible-assets-amortization-revenue-method",
    "updatedAt": "2026-09-08",
    "topic": "无形资产",
    "difficulty": "高频易错",
    "question": "无形资产摊销能否采用收入法？车流量法是不是收入法？",
    "summary": "无形资产按经济利益消耗方式摊销；车流量法属于使用量法，收入法原则上不适用。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "无形资产",
      "摊销",
      "收入法",
      "车流量法",
      "高速公路经营权",
      "工作量法"
    ]
  },
  {
    "id": "intangible-assets-pre-use-ineffective-losses",
    "updatedAt": "2026-09-08",
    "topic": "无形资产",
    "difficulty": "高频易错",
    "question": "无形资产达到预定用途前的无效损失、初始运作损失和专利登记费怎么区分？",
    "summary": "成本限于取得无形资产并使其达到预定用途的必要支出，不能仅按支出发生早晚判断。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "无形资产",
      "专利登记费",
      "注册费",
      "无效损失",
      "初始运作损失",
      "成本"
    ]
  },
  {
    "id": "intangible-assets-rd-super-deduction-deferred-tax",
    "updatedAt": "2026-09-08",
    "topic": "无形资产",
    "difficulty": "高频易错",
    "question": "研发支出加计扣除和递延所得税资产",
    "summary": "研发加计扣除：费用化部分影响当期应纳税所得额；资本化部分须判断递延所得税初始确认豁免。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "无形资产",
      "研发支出",
      "加计扣除",
      "递延所得税",
      "所得税"
    ]
  },
  {
    "id": "intangible-assets-rd-expense-and-amortization-presentation",
    "updatedAt": "2026-09-08",
    "topic": "无形资产",
    "difficulty": "高频易错",
    "question": "自行研发无形资产的研究支出和摊销，分别计入什么科目、如何在利润表列报？",
    "summary": "研究阶段支出费用化；开发阶段满足条件才资本化；形成资产后的摊销按用途归集。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "研究支出期末结转",
        "lines": [
          {
            "side": "借",
            "account": "管理费用—研究费用",
            "amount": "费用化金额"
          },
          {
            "side": "贷",
            "account": "研发支出—费用化支出",
            "amount": "费用化金额"
          }
        ]
      },
      {
        "title": "开发成果达到预定用途",
        "lines": [
          {
            "side": "借",
            "account": "无形资产",
            "amount": "符合条件的资本化支出"
          },
          {
            "side": "贷",
            "account": "研发支出—资本化支出",
            "amount": "符合条件的资本化支出"
          }
        ]
      }
    ],
    "tags": [
      "无形资产",
      "研发支出",
      "研发费用",
      "管理费用",
      "摊销",
      "利润表列报"
    ]
  }
];
