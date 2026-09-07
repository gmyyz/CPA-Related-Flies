// 此文件由专题维护；不要把所有卡片重新合并到单一文件。
export default [
  {
    "id": "contingencies-dismissal-benefits-payroll",
    "updatedAt": "2026-09-06",
    "topic": "或有事项",
    "difficulty": "高频易错",
    "question": "负债需要估计，就适用或有事项准则吗？",
    "summary": "先确定适用准则：辞退福利归职工薪酬，财务担保先判断金融工具或保险合同准则。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "或有事项",
      "预计负债",
      "辞退福利",
      "应付职工薪酬"
    ]
  },
  {
    "id": "contingencies-recognition-vs-contingent-liability",
    "updatedAt": "2026-09-06",
    "topic": "或有事项",
    "difficulty": "高频易错",
    "question": "预计负债的确认条件和或有负债的区别",
    "summary": "现时义务、很可能流出、金额可靠计量三项齐备才确认；或有负债不确认但须判断披露。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "或有事项",
      "预计负债",
      "或有负债"
    ]
  },
  {
    "id": "contingencies-litigation-expense-classification",
    "updatedAt": "2026-09-06",
    "topic": "或有事项",
    "difficulty": "高频易错",
    "question": "未决诉讼中预计负债和营业外支出的金额区分",
    "summary": "诉讼例题负债总额195万元，其中诉讼费2万元、营业外支出193万元。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "或有事项",
      "预计负债",
      "未决诉讼",
      "营业外支出"
    ],
    "journalEntries": [
      {
        "title": "未决诉讼计提",
        "condition": "万元，含诉讼费2",
        "lines": [
          {
            "side": "借",
            "account": "营业外支出",
            "amount": "193"
          },
          {
            "side": "借",
            "account": "管理费用",
            "amount": "2"
          },
          {
            "side": "贷",
            "account": "预计负债",
            "amount": "195"
          }
        ]
      }
    ]
  },
  {
    "id": "contingencies-best-estimate-measurement",
    "updatedAt": "2026-09-06",
    "topic": "或有事项",
    "difficulty": "高频易错",
    "question": "预计负债最佳估计数的确定方法",
    "summary": "连续等概率取中点；其他单项取最可能金额，多项按概率加权，并考虑重大时间价值。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "或有事项",
      "预计负债"
    ]
  },
  {
    "id": "contingencies-actual-loss-vs-provision",
    "updatedAt": "2026-09-06",
    "topic": "或有事项",
    "difficulty": "高频易错",
    "question": "未决诉讼实际损失与已计提预计负债差额的处理",
    "summary": "先判断日后事项，再区分合理估计差异与前期差错；满足条件即确认，无须等付款。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "或有事项",
      "预计负债",
      "未决诉讼"
    ]
  },
  {
    "id": "contingencies-onerous-contract-inventory-cost",
    "updatedAt": "2026-09-06",
    "topic": "或有事项",
    "difficulty": "高频易错",
    "question": "亏损合同预计负债为什么后续冲减库存商品成本",
    "summary": "亏损合同按不可避免的最低净成本处理；先考虑标的资产减值，后续避免重复确认亏损。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "亏损合同尚无标的资产：提前确认亏损",
        "scope": "履约亏损 100 万元低于违约金 400 万元",
        "condition": "签约时未开始生产，尚未形成存货等标的资产",
        "lines": [
          {
            "side": "借",
            "account": "营业外支出",
            "amount": "100"
          },
          {
            "side": "贷",
            "account": "预计负债",
            "amount": "100"
          }
        ],
        "note": ""
      },
      {
        "title": "产品完工后：预计负债冲减库存商品成本",
        "scope": "实际生产成本 2,100 万元",
        "condition": "标的产品已经形成库存商品",
        "lines": [
          {
            "side": "借",
            "account": "预计负债",
            "amount": "100"
          },
          {
            "side": "贷",
            "account": "库存商品",
            "amount": "100"
          }
        ],
        "note": ""
      },
      {
        "title": "后续按合同销售并结转成本",
        "scope": "合同售价与调整后库存商品账面成本均为 2,000 万元",
        "condition": "不考虑税费",
        "lines": [
          {
            "side": "借",
            "account": "应收账款 / 银行存款",
            "amount": "2,000"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "2,000"
          },
          {
            "side": "借",
            "account": "主营业务成本",
            "amount": "2,000"
          },
          {
            "side": "贷",
            "account": "库存商品",
            "amount": "2,000"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "或有事项",
      "预计负债",
      "亏损合同",
      "库存商品",
      "主营业务成本",
      "分录"
    ]
  },
  {
    "id": "contingencies-restructuring-obligation",
    "updatedAt": "2026-09-06",
    "topic": "或有事项",
    "difficulty": "高频易错",
    "question": "重组义务的确认和计量",
    "summary": "重组负债限必要直接支出；例题直接支出380万元，分别贷记预计负债80、应付职工薪酬300。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "或有事项",
      "重组义务"
    ]
  },
  {
    "id": "contingencies-provision-presentation",
    "updatedAt": "2026-09-06",
    "topic": "或有事项",
    "difficulty": "高频易错",
    "question": "预计负债在资产负债表中的列报",
    "summary": "预计负债按流动性列报；长期质保无法合理拆分近期清偿额时，全部列其他流动负债。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "或有事项",
      "预计负债",
      "列报"
    ]
  }
];
