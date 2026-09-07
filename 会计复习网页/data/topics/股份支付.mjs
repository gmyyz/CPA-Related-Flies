// 此文件由专题维护；不要把所有卡片重新合并到单一文件。
export default [
  {
    "id": "share-based-payment-cash-vs-equity",
    "updatedAt": "2026-09-06",
    "topic": "股份支付",
    "difficulty": "高频基础",
    "question": "股份支付以现金结算和以权益结算有什么区别？",
    "summary": "先判断结算义务与所交付工具的归属，再确定权益或现金结算；股价挂钩本身不能决定分类。",
    "conclusion": [],
    "reasoning": [
      "一般职工股份支付：以自身权益工具换服务，按权益结算；承担以股价等为基础确定的现金或其他资产支付义务，按现金结算。集团安排须分别判断各主体，详见本章集团卡。",
      "| 项目 | 一般权益结算 | 现金结算 |\n| --- | --- | --- |\n| 计量基础 | 职工服务通常按授予日权益工具公允价值 | 负债结算前各报表日及结算日公允价值 |\n| 等待期累计确认 | 预计可行权数量×授予日价值×服务进度 | 未结算数量×当期价值×服务进度；有当期结算须另计已结算金额 |\n| 贷方 | 资本公积 | 应付职工薪酬 |\n| 立即可行权 | 授予日确认取得服务 | 授予日确认取得服务与负债 |",
      "服务按受益对象计入成本或费用；本期确认额扣除以前累计确认额。权益结算的非职工服务还须按服务公允价值能否可靠计量确定计量基础，不能一概套用职工授予日规则。"
    ],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "股份支付",
      "现金结算",
      "权益结算",
      "资本公积",
      "应付职工薪酬"
    ],
    "journalEntries": [
      {
        "title": "权益结算股份支付：等待期内确认本期费用",
        "scope": "限制性股票或股票期权",
        "condition": "本期根据预计可行权数量、授予日公允价值和服务进度计算应确认的股份支付费用",
        "lines": [
          {
            "side": "借",
            "account": "管理费用等",
            "amount": "本期股份支付费用"
          },
          {
            "side": "贷",
            "account": "资本公积——其他资本公积",
            "amount": "本期股份支付费用"
          }
        ],
        "note": ""
      },
      {
        "title": "现金结算股份支付：期末确认或重计量负债",
        "scope": "现金结算股份支付",
        "condition": "等待期内资产负债表日，按期末公允价值和服务进度确定累计负债",
        "lines": [
          {
            "side": "借",
            "account": "管理费用等",
            "amount": "本期增加的负债"
          },
          {
            "side": "贷",
            "account": "应付职工薪酬——股份支付",
            "amount": "本期增加的负债"
          }
        ],
        "note": ""
      }
    ]
  },
  {
    "id": "share-based-payment-employee-platform-substance",
    "updatedAt": "2026-09-06",
    "topic": "股份支付",
    "difficulty": "高频易错",
    "question": "员工持股平台会不会改变股份支付判断？",
    "summary": "平台不改变服务换权益的实质；代持受让与再授予员工须分别判断。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "股份支付",
      "员工持股平台",
      "实质重于形式",
      "服务期",
      "代持"
    ]
  },
  {
    "id": "share-based-payment-restricted-stock-option-types",
    "updatedAt": "2026-09-06",
    "topic": "股份支付",
    "difficulty": "高频基础",
    "question": "一类限制性股票、二类限制性股票和股票期权怎么区分？",
    "summary": "一类通常先持股后解锁，二类和期权通常先授资格后认购；估值须看实际条款。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "股份支付",
      "限制性股票",
      "股票期权",
      "二类限制性股票",
      "权益结算"
    ]
  },
  {
    "id": "share-based-payment-intrinsic-value-equity-settled",
    "updatedAt": "2026-09-06",
    "topic": "股份支付",
    "difficulty": "高频易错",
    "question": "权益结算股份支付采用内在价值计量时，为什么每期要重新计量？",
    "summary": "公允价值无法可靠确定的极少数例外采用内在价值重估，但仍为权益结算。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "股份支付",
      "权益结算",
      "内在价值",
      "资本公积",
      "重新计量"
    ]
  },
  {
    "id": "share-based-payment-early-settlement-cancellation",
    "updatedAt": "2026-09-06",
    "topic": "股份支付",
    "difficulty": "高频易错",
    "question": "期权型权益工具提前结算或取消怎么处理？",
    "summary": "主动提前取消先加速认费用，再将付款分为冲权益和超额损益。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "股份支付",
      "取消",
      "结算",
      "加速可行权",
      "回购权益工具"
    ]
  },
  {
    "id": "share-based-payment-vesting-conditions-value-quantity",
    "updatedAt": "2026-09-06",
    "topic": "股份支付",
    "difficulty": "高频基础",
    "question": "服务期限、市场条件、非市场条件和非可行权条件分别影响公允价值还是数量？",
    "summary": "服务及非市场业绩调数量，市场及非可行权条件在估值中考虑。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "股份支付",
      "可行权条件",
      "市场条件",
      "非市场条件",
      "非可行权条件"
    ]
  },
  {
    "id": "share-based-payment-exercise-share-source",
    "updatedAt": "2026-09-06",
    "topic": "股份支付",
    "difficulty": "高频易错",
    "question": "可行权后股票来源不同，行权分录有什么区别？",
    "summary": "新发行股份贷股本；交付回购股份冲库存股，差额在权益内部处理。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "股份支付",
      "行权",
      "库存股",
      "股本",
      "资本公积"
    ]
  },
  {
    "id": "share-based-payment-modification-favorable",
    "updatedAt": "2026-09-06",
    "topic": "股份支付",
    "difficulty": "高频综合",
    "question": "股份支付协议有利修改怎么处理？",
    "summary": "原价值与修改日增量分开计量；缩短等待期例题首年费用为1,150万元。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "股份支付",
      "有利修改",
      "不利修改",
      "减少授予数量",
      "降低行权价",
      "增加公允价值",
      "缩短等待期",
      "延长服务期",
      "取消"
    ],
    "journalEntries": [
      {
        "title": "缩短等待期例题：首年全年合计",
        "condition": "金额单位为万元",
        "lines": [
          {
            "side": "借",
            "account": "管理费用",
            "amount": "1,150"
          },
          {
            "side": "贷",
            "account": "资本公积——其他资本公积",
            "amount": "1,150"
          }
        ]
      },
      {
        "title": "缩短等待期例题：次年",
        "condition": "金额单位为万元",
        "lines": [
          {
            "side": "借",
            "account": "管理费用",
            "amount": "1,400"
          },
          {
            "side": "贷",
            "account": "资本公积——其他资本公积",
            "amount": "1,400"
          }
        ]
      }
    ]
  },
  {
    "id": "share-based-payment-cancel-settle-nonmarket-failure",
    "updatedAt": "2026-09-06",
    "topic": "股份支付",
    "difficulty": "高频易错",
    "question": "取消、结算和非市场条件未达成导致失效有什么区别？",
    "summary": "主动取消与条件失败分开处理，部分取消后不能因其余工具失败而全额冲回。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "股份支付",
      "取消",
      "结算",
      "非市场条件",
      "服务条件",
      "不利修改",
      "减少授予数量",
      "估计修正"
    ],
    "journalEntries": [
      {
        "title": "主动取消部分：第2年补确认",
        "condition": "金额单位为万元",
        "lines": [
          {
            "side": "借",
            "account": "管理费用",
            "amount": "360"
          },
          {
            "side": "贷",
            "account": "资本公积——其他资本公积",
            "amount": "360"
          }
        ]
      },
      {
        "title": "剩余部分非市场条件失败：冲回",
        "condition": "金额单位为万元",
        "lines": [
          {
            "side": "借",
            "account": "资本公积——其他资本公积",
            "amount": "1,440"
          },
          {
            "side": "贷",
            "account": "管理费用",
            "amount": "1,440"
          }
        ]
      }
    ]
  },
  {
    "id": "share-based-payment-replacement-awards",
    "updatedAt": "2026-09-06",
    "topic": "股份支付",
    "difficulty": "高频综合",
    "question": "取消旧权益工具后授予新权益工具，替代和新授予怎么区分？",
    "summary": "认定替代按修改；未认定替代，旧计划取消、新计划单独确认。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "股份支付",
      "替代权益工具",
      "取消",
      "新授予",
      "现金补偿"
    ]
  },
  {
    "id": "share-based-payment-cash-to-equity-modification",
    "updatedAt": "2026-09-06",
    "topic": "股份支付",
    "difficulty": "高频综合",
    "question": "现金结算股份支付修改为权益结算股份支付怎么处理？",
    "summary": "按修改日价值及修改后等待期确认已取得服务，转出原负债，差额入损益。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "股份支付",
      "现金结算",
      "权益结算",
      "修改",
      "等待期",
      "不利修改",
      "应付职工薪酬",
      "资本公积"
    ]
  },
  {
    "id": "share-based-payment-multi-tier-performance-not-tranche",
    "updatedAt": "2026-09-06",
    "topic": "股份支付",
    "difficulty": "高频易错",
    "question": "多档业绩条件一定属于一次授予、分批解锁吗？",
    "summary": "同一批期权按多档业绩路径整体可行权，调整预计等待期，不机械拆成多批。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "股份支付",
      "分批解锁",
      "非市场条件",
      "预计等待期",
      "业绩条件"
    ]
  },
  {
    "id": "share-based-payment-after-vesting-date",
    "updatedAt": "2026-09-06",
    "topic": "股份支付",
    "difficulty": "高频基础",
    "question": "可行权日之后，权益结算和现金结算分别怎么处理？",
    "summary": "一般权益结算可行权后不重估；现金结算负债继续重估，同日结算须分对象。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "第2年末确认等待期内费用",
        "scope": "现金结算股份支付",
        "condition": "8 人满足条件，其中 5 人当日行权支付 1,000，剩余 3 人按期末公允价值确认负债 660；前期已确认 630。",
        "lines": [
          {
            "side": "借",
            "account": "管理费用",
            "amount": "1,030"
          },
          {
            "side": "贷",
            "account": "应付职工薪酬--股份支付",
            "amount": "1,030"
          }
        ],
        "note": ""
      },
      {
        "title": "第2年末已行权部分结算",
        "scope": "现金结算股份支付",
        "condition": "5 人当日行权，每份实际支付现金 10 元。",
        "lines": [
          {
            "side": "借",
            "account": "应付职工薪酬--股份支付",
            "amount": "1,000"
          },
          {
            "side": "贷",
            "account": "银行存款",
            "amount": "1,000"
          }
        ],
        "note": ""
      },
      {
        "title": "第3年末结算前补调负债",
        "scope": "可行权日之后",
        "condition": "剩余 3 人实际结算支付 720，期初负债余额 660。",
        "lines": [
          {
            "side": "借",
            "account": "公允价值变动损益",
            "amount": "60"
          },
          {
            "side": "贷",
            "account": "应付职工薪酬--股份支付",
            "amount": "60"
          }
        ],
        "note": ""
      },
      {
        "title": "第3年末剩余部分结算付款",
        "scope": "现金结算股份支付",
        "condition": "剩余 3 人行权，每份实际支付现金 12 元。",
        "lines": [
          {
            "side": "借",
            "account": "应付职工薪酬--股份支付",
            "amount": "720"
          },
          {
            "side": "贷",
            "account": "银行存款",
            "amount": "720"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "股份支付",
      "可行权日",
      "权益结算",
      "现金结算",
      "公允价值变动损益"
    ]
  },
  {
    "id": "share-based-payment-group-arrangements",
    "updatedAt": "2026-09-06",
    "topic": "股份支付",
    "difficulty": "高频综合",
    "question": "集团股份支付应如何结构化判断？",
    "summary": "分别判断接受服务企业、结算企业和集团；调任按接受服务期间分配费用。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "第1年母公司个别报表",
        "scope": "母公司用自身权益工具结算",
        "condition": "20 名甲公司员工中 2 人离职；10 名乙公司员工预计均满足条件。",
        "lines": [
          {
            "side": "借",
            "account": "管理费用",
            "amount": "72"
          },
          {
            "side": "借",
            "account": "长期股权投资--乙公司",
            "amount": "40"
          },
          {
            "side": "贷",
            "account": "资本公积--其他资本公积",
            "amount": "112"
          }
        ],
        "note": ""
      },
      {
        "title": "第1年子公司个别报表",
        "scope": "子公司没有结算义务",
        "condition": "乙公司接受 10 名员工服务。",
        "lines": [
          {
            "side": "借",
            "account": "管理费用",
            "amount": "40"
          },
          {
            "side": "贷",
            "account": "资本公积--其他资本公积",
            "amount": "40"
          }
        ],
        "note": ""
      },
      {
        "title": "第1年合并抵销",
        "scope": "合并报表",
        "condition": "抵销母公司长期股权投资和子公司资本公积。",
        "lines": [
          {
            "side": "借",
            "account": "资本公积--其他资本公积",
            "amount": "40"
          },
          {
            "side": "贷",
            "account": "长期股权投资--乙公司",
            "amount": "40"
          }
        ],
        "note": ""
      },
      {
        "title": "第2年母公司个别报表",
        "scope": "集团内调任后",
        "condition": "甲公司 3 人调任乙公司，调任前一年服务仍归甲公司。",
        "lines": [
          {
            "side": "借",
            "account": "管理费用",
            "amount": "60"
          },
          {
            "side": "借",
            "account": "长期股权投资--乙公司",
            "amount": "44"
          },
          {
            "side": "贷",
            "account": "资本公积--其他资本公积",
            "amount": "104"
          }
        ],
        "note": ""
      },
      {
        "title": "第2年子公司个别报表",
        "scope": "集团内调任后",
        "condition": "乙公司原有人员 1 人离职，另有 3 人自甲公司调入。",
        "lines": [
          {
            "side": "借",
            "account": "管理费用",
            "amount": "44"
          },
          {
            "side": "贷",
            "account": "资本公积--其他资本公积",
            "amount": "44"
          }
        ],
        "note": ""
      },
      {
        "title": "第2年合并抵销",
        "scope": "合并报表",
        "condition": "抵销本年母公司长期股权投资和子公司资本公积。",
        "lines": [
          {
            "side": "借",
            "account": "资本公积--其他资本公积",
            "amount": "44"
          },
          {
            "side": "贷",
            "account": "长期股权投资--乙公司",
            "amount": "44"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "股份支付",
      "集团股份支付",
      "长期股权投资",
      "子公司",
      "资本公积",
      "现金结算",
      "权益结算",
      "合并报表",
      "少数股东损益"
    ]
  },
  {
    "id": "share-based-payment-restricted-stock-dividends",
    "updatedAt": "2026-09-06",
    "topic": "股份支付",
    "difficulty": "高频易错",
    "question": "限制性股票现金股利怎么结构化判断？",
    "summary": "限制性股票股利按能否解锁、能否撤销四格处理，实际支付分录相同。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "股份支付",
      "限制性股票",
      "现金股利",
      "回购义务",
      "利润分配",
      "管理费用"
    ]
  },
  {
    "id": "share-based-payment-exam-workflow-with-eps",
    "updatedAt": "2026-09-08",
    "topic": "股份支付",
    "difficulty": "高频综合",
    "question": "股份支付综合题如何拆解：费用确认、限制性股票/期权与每股收益？",
    "summary": "综合题先确认股份支付服务成本，再独立计算基本和稀释每股收益。",
    "conclusion": [],
    "reasoning": [
      "① 识别工具、结算义务及服务或业绩条件，按本章分类、修改和结算规则计算当期服务成本并编制分录。",
      "② 基本EPS：判断实际普通股的在外期间及限制性股票参与利润分配的权利，计算分子、分母；详见第28章限制性股票基本EPS卡。",
      "③ 稀释EPS：按期末实际业绩检验条件，再计算假定行权对价、加权净增股数和分子调整，检验整体稀释性；公式及60,000股年末回购3,000股例集中在第28章限制性股票稀释卡。",
      "数量口径分开：预计未来离职影响服务成本及相应股利分配估计；实际离职、回购或作废影响工具在外期间，不能用预计最终解锁数直接替代EPS时间加权数量。"
    ],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "股份支付",
      "综合题",
      "限制性股票",
      "股票期权",
      "权益结算",
      "现金结算",
      "每股收益",
      "稀释每股收益",
      "库存股法",
      "Markdown同步"
    ]
  }
];
