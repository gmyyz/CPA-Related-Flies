// 此文件由专题维护；不要把所有卡片重新合并到单一文件。
export default [
  {
    "id": "borrowing-cost-capitalization-start-assets-expenditure",
    "updatedAt": "2026-09-06",
    "topic": "借款费用",
    "difficulty": "高频基础",
    "question": "借款费用开始资本化时，资产支出已经发生怎么判断？",
    "summary": "开始资本化须三项条件同时满足；现金、非现金转移和带息债务属于资产支出，不带息赊购付款时才计入。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "借款费用",
      "资本化起点",
      "资产支出",
      "带息债务",
      "不带息赊购",
      "一般借款"
    ]
  },
  {
    "id": "borrowing-cost-general-borrowing-official-method",
    "updatedAt": "2026-09-06",
    "topic": "借款费用",
    "difficulty": "高频提高",
    "question": "一般借款利息资本化金额怎么计算？",
    "summary": "一般借款按超过专门借款部分的加权支出乘资本化率计算，并检查实际利息上限。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "借款费用",
      "一般借款",
      "资本化率",
      "加权平均数",
      "累计资产支出",
      "利息资本化"
    ]
  },
  {
    "id": "borrowing-cost-premium-bond-special-borrowing-example",
    "updatedAt": "2026-09-06",
    "topic": "借款费用",
    "difficulty": "高频易错",
    "question": "专门借款是溢价发行债券时，为什么用发行价格而不是面值计算？",
    "summary": "本例无交易费用：按发行价确定专门借款可动用资金，全年资本化利息116.18万元，在建工程3,416.18万元。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "借款费用",
      "专门借款",
      "溢价发行",
      "债券",
      "发行价格",
      "实际利率法",
      "闲置资金收益"
    ],
    "journalEntries": [
      {
        "title": "溢价发行债券",
        "scope": "专门借款",
        "condition": "无交易费用，金额单位为万元",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "2,054.384"
          },
          {
            "side": "贷",
            "account": "应付债券——面值",
            "amount": "2,000"
          },
          {
            "side": "贷",
            "account": "应付债券——利息调整",
            "amount": "54.384"
          }
        ]
      }
    ]
  },
  {
    "id": "borrowing-cost-land-use-right-real-estate-vs-self-use",
    "updatedAt": "2026-09-06",
    "topic": "借款费用",
    "difficulty": "高频易错",
    "question": "土地使用权支出在借款费用资本化中怎么处理？",
    "summary": "自用建筑以建造支出及期间土地摊销为基础；房企开发出售还纳入土地使用权支出。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "借款费用",
      "土地使用权",
      "自用厂房",
      "房地产开发",
      "开发成本",
      "在建工程",
      "资本化基础"
    ]
  },
  {
    "id": "borrowing-cost-transaction-cost-amortized-cost-start-date-example",
    "updatedAt": "2026-09-06",
    "topic": "借款费用",
    "difficulty": "高频易错",
    "question": "债券专门借款有交易费用时，资本化金额和财务费用怎么计算？",
    "summary": "本例交易费用扣减债券初始金额，3月才开始资本化：资本化152.42万元，前期财务费用净额9.48万元。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "借款费用",
      "专门借款",
      "交易费用",
      "摊余成本",
      "实际利率法",
      "应付利息",
      "财务费用",
      "闲置资金收益"
    ]
  }
];
