// 此文件由专题维护；不要把所有卡片重新合并到单一文件。
export default [
  {
    "id": "non-monetary-exchange-monetary-assets-prepayment",
    "updatedAt": "2026-09-07",
    "topic": "非货币性资产交换",
    "difficulty": "高频基础",
    "question": "货币性资产怎么判断，为什么预付账款不算？",
    "summary": "货币性资产看固定或可确定资金收取权；采购预付款通常收货，确定退款权需另行判断。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "非货币性资产交换",
      "货币性资产",
      "预付账款",
      "应收账款",
      "Markdown同步"
    ]
  },
  {
    "id": "non-monetary-exchange-scope-exclusions-special-standards",
    "updatedAt": "2026-09-07",
    "topic": "非货币性资产交换",
    "difficulty": "高频易错",
    "question": "不适用非货币性资产交换准则时，是不是只看换入资产？",
    "summary": "按交易性质及具体资产适用规则判断；存货换客户资产、企业合并、金融和租赁资产、权益性交易各有条件。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "非货币性资产交换",
      "适用范围",
      "收入准则",
      "企业合并",
      "金融工具",
      "租赁",
      "权益性交易",
      "Markdown同步"
    ]
  },
  {
    "id": "non-monetary-exchange-fair-value-vs-carrying-amount",
    "updatedAt": "2026-09-07",
    "topic": "非货币性资产交换",
    "difficulty": "高频基础",
    "question": "什么时候用公允价值计量，什么时候用账面价值计量？",
    "summary": "有商业实质且至少一方公允价值可靠才用公允价值；双方均可靠时原则以换出为基础。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "非货币性资产交换",
      "公允价值计量",
      "账面价值计量",
      "商业实质",
      "Markdown同步"
    ]
  },
  {
    "id": "non-monetary-exchange-disposal-gain-anchor",
    "updatedAt": "2026-09-07",
    "topic": "非货币性资产交换",
    "difficulty": "高频易错",
    "question": "以换入公允计量和以换出公允计量时，换出资产处置损益怎么确认？",
    "summary": "多项换出按各项对价分别确认损益；换入公允价值更可靠时，按换出公允价值相对比例分摊对价。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "非货币性资产交换",
      "处置损益",
      "换出资产公允价值",
      "换入资产公允价值",
      "倒挤",
      "Markdown同步"
    ]
  },
  {
    "id": "non-monetary-exchange-boot-ratio-25-percent",
    "updatedAt": "2026-09-07",
    "topic": "非货币性资产交换",
    "difficulty": "高频基础",
    "question": "涉及补价时，怎么判断是否仍属于非货币性资产交换？",
    "summary": "少量补价通常以低于25%判断；区分资产价差与含税现金结算，甲乙设备例双方均20%。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "非货币性资产交换",
      "补价",
      "25%",
      "适用范围",
      "Markdown同步"
    ]
  },
  {
    "id": "non-monetary-exchange-vat-boot-fees-examples",
    "updatedAt": "2026-09-07",
    "topic": "非货币性资产交换",
    "difficulty": "高频综合",
    "question": "涉及增值税、补价和相关税费时，换入资产成本和分录怎么做？",
    "summary": "按计量基础计算成本，现金结算与税额差分清口径；保留三例97/123/64.6成本及10/20/0损益。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "例 1：以换出资产公允价值计量",
        "scope": "非货币性资产交换",
        "condition": "具有商业实质，换出设备公允价值更可靠，收到补价并支付安装费",
        "lines": [
          {
            "side": "借",
            "account": "固定资产",
            "amount": "97"
          },
          {
            "side": "借",
            "account": "应交税费--应交增值税（进项税额）",
            "amount": "12.35"
          },
          {
            "side": "借",
            "account": "银行存款",
            "amount": "5.65"
          },
          {
            "side": "借",
            "account": "累计折旧",
            "amount": "60"
          },
          {
            "side": "贷",
            "account": "固定资产",
            "amount": "150"
          },
          {
            "side": "贷",
            "account": "应交税费--应交增值税（销项税额）",
            "amount": "13"
          },
          {
            "side": "贷",
            "account": "银行存款",
            "amount": "2"
          },
          {
            "side": "贷",
            "account": "资产处置损益",
            "amount": "10"
          }
        ],
        "note": "换入设备成本 = 100 + 13 - 12.35 - 5.65 + 2 = 97。"
      },
      {
        "title": "例 2：以换入资产公允价值计量",
        "scope": "非货币性资产交换",
        "condition": "具有商业实质，换入设备公允价值更可靠，支付补价和安装费",
        "lines": [
          {
            "side": "借",
            "account": "固定资产",
            "amount": "123"
          },
          {
            "side": "借",
            "account": "应交税费--应交增值税（进项税额）",
            "amount": "15.6"
          },
          {
            "side": "借",
            "account": "累计折旧",
            "amount": "50"
          },
          {
            "side": "贷",
            "account": "固定资产",
            "amount": "130"
          },
          {
            "side": "贷",
            "account": "应交税费--应交增值税（销项税额）",
            "amount": "13"
          },
          {
            "side": "贷",
            "account": "银行存款",
            "amount": "25.6"
          },
          {
            "side": "贷",
            "account": "资产处置损益",
            "amount": "20"
          }
        ],
        "note": "换入设备成本 = 120 + 3 = 123；银行存款 = 22.6 + 3 = 25.6。"
      },
      {
        "title": "例 3：以账面价值计量",
        "scope": "非货币性资产交换",
        "condition": "不具有商业实质，按账面价值计量，不确认交换损益",
        "lines": [
          {
            "side": "借",
            "account": "固定资产",
            "amount": "64.6"
          },
          {
            "side": "借",
            "account": "应交税费--应交增值税（进项税额）",
            "amount": "7.8"
          },
          {
            "side": "借",
            "account": "累计折旧",
            "amount": "40"
          },
          {
            "side": "贷",
            "account": "固定资产",
            "amount": "100"
          },
          {
            "side": "贷",
            "account": "应交税费--应交增值税（销项税额）",
            "amount": "9.1"
          },
          {
            "side": "贷",
            "account": "银行存款",
            "amount": "3.3"
          }
        ],
        "note": "换入设备成本 = 60 + 9.1 - 7.8 + 1.3 + 2 = 64.6；不确认资产处置损益。"
      }
    ],
    "tags": [
      "非货币性资产交换",
      "增值税",
      "补价",
      "相关税费",
      "分录",
      "公允价值计量",
      "账面价值计量",
      "Markdown同步"
    ]
  },
  {
    "id": "non-monetary-exchange-multiple-assets-allocation",
    "updatedAt": "2026-09-07",
    "topic": "非货币性资产交换",
    "difficulty": "高频提高",
    "question": "同时换入或换出多项资产时，入账金额和处置损益怎么分摊？",
    "summary": "先分交换对价、再加归属税费；换入公允更可靠时直接计量，账面模式的分摊优先公允比例。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "非货币性资产交换",
      "多项资产交换",
      "分摊",
      "处置损益",
      "公允价值比例",
      "Markdown同步"
    ]
  },
  {
    "id": "non-monetary-exchange-commercial-substance",
    "updatedAt": "2026-09-07",
    "topic": "非货币性资产交换",
    "difficulty": "高频基础",
    "question": "非货币性资产交换中的商业实质怎么判断？",
    "summary": "商业实质看现金流风险、时间或金额显著变化，或现值差额重大；资产类别不能代替判断。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "非货币性资产交换",
      "商业实质",
      "现金流量",
      "公允价值计量",
      "Markdown同步"
    ]
  },
  {
    "id": "non-monetary-exchange-equity-investment-scope",
    "updatedAt": "2026-09-07",
    "topic": "非货币性资产交换",
    "difficulty": "高频易错",
    "question": "股权投资参与非货币性资产交换时，哪些适用非货币性资产交换准则？",
    "summary": "股权交换先判断控制、业务及投资性质，再衔接合并、长投或金融工具规则。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "非货币性资产交换",
      "股权投资",
      "联营企业",
      "合营企业",
      "企业合并",
      "金融工具",
      "权益性交易",
      "Markdown同步"
    ]
  }
];
