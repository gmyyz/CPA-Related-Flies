// 正文详见章节笔记，避免重复维护。
export default [
  {
    "id": "revenue-five-step-and-control",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频基础",
    "question": "收入确认五步法和取得控制权怎么记？",
    "summary": "收入按合同、履约义务、交易价格、分摊、确认五步处理，核心是客户取得控制权。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "收入准则",
      "Markdown同步",
      "五步法",
      "控制权"
    ]
  },
  {
    "id": "revenue-contract-formation-five-conditions",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频基础",
    "question": "合同成立五个条件如何快速记忆？",
    "summary": "收入合同须满足批准承诺、权利、付款条款、商业实质及可收回性五条件；不满足时另判已收款。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "收入准则",
      "Markdown同步",
      "合同成立",
      "批权款商收"
    ]
  },
  {
    "id": "revenue-distinct-performance-obligation",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频基础",
    "question": "单项履约义务成立的两个条件怎么理解？",
    "summary": "先判断能否单独受益及合同承诺能否区分，再检查系列规则；质量保证按是否提供额外服务等分类。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "收入准则",
      "Markdown同步",
      "单项履约义务",
      "可明确区分",
      "质量保证"
    ]
  },
  {
    "id": "revenue-contract-combination-vs-po-combination",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频易错",
    "question": "合同合并和单项履约义务合并有什么区别？",
    "summary": "合同合并确定合同范围，履约义务识别确定核算单元；满足合并条件不代表所有承诺成为一项义务。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "收入准则",
      "Markdown同步",
      "合同合并",
      "履约义务识别"
    ]
  },
  {
    "id": "revenue-over-time-three-criteria",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频基础",
    "question": "某一时段履约的三个条件如何记？",
    "summary": "满足即时消耗、控制在建商品、无替代用途且全程有权收款之一，按时段履约；进度不能合理确定另行处理。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "收入准则",
      "Markdown同步",
      "某一时段履约",
      "履约进度"
    ]
  },
  {
    "id": "revenue-point-in-time-control-indicators",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频基础",
    "question": "某一时点履约的控制权转移迹象怎么记？",
    "summary": "时点收入以控制权转移为准，综合现时收款权、所有权、实物占有、风险报酬和客户接受等迹象。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "收入准则",
      "Markdown同步",
      "某一时点履约",
      "控制权迹象"
    ]
  },
  {
    "id": "revenue-transaction-price-variable-consideration-ip-royalty",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频易错",
    "question": "可变对价限制和知识产权提成专门规则怎么区分？",
    "summary": "普通可变对价先估计并限制，逐期重估；知识产权销售或使用提成按实际发生与相关履约孰晚确认。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "收入准则",
      "Markdown同步",
      "交易价格",
      "可变对价",
      "知识产权提成"
    ]
  },
  {
    "id": "revenue-transaction-price-significant-financing",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频易错",
    "question": "重大融资成分怎么判断和做分录？",
    "summary": "重大融资成分按现销金额确定交易价格，差额按实际利率摊销；一年简化与非融资原因须满足各自条件。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "客户延期付款存在重大融资成分",
        "scope": "收入确认",
        "condition": "客户两年后付款，存在重大融资成分；忽略税额，以名义总额列示长期应收款",
        "lines": [
          {
            "side": "借",
            "account": "长期应收款",
            "amount": "合同收款总额"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "现销价格"
          },
          {
            "side": "贷",
            "account": "未实现融资收益",
            "amount": "差额"
          }
        ],
        "note": "后续通过未实现融资收益按实际利率法摊销，避免与净额应收款法混用。"
      },
      {
        "title": "摊销延期收款融资收益",
        "scope": "重大融资成分",
        "condition": "名义总额列示长期应收款",
        "lines": [
          {
            "side": "借",
            "account": "未实现融资收益",
            "amount": "当期实际利息"
          },
          {
            "side": "贷",
            "account": "财务费用等",
            "amount": "当期实际利息"
          }
        ],
        "note": ""
      },
      {
        "title": "收到含融资成分的预付款",
        "scope": "重大融资成分",
        "condition": "企业两年后交货，存在重大融资成分；忽略税额",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "预收款"
          },
          {
            "side": "贷",
            "account": "合同负债",
            "amount": "预收款"
          }
        ],
        "note": "履约时按收入准则结转合同负债。"
      },
      {
        "title": "确认预付款融资利息",
        "scope": "重大融资成分",
        "condition": "相关合同负债已确认；不符合资本化条件",
        "lines": [
          {
            "side": "借",
            "account": "财务费用等",
            "amount": "当期实际利息"
          },
          {
            "side": "贷",
            "account": "合同负债",
            "amount": "当期实际利息"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "收入准则",
      "Markdown同步",
      "重大融资成分",
      "实际利率法",
      "分录"
    ]
  },
  {
    "id": "revenue-transaction-price-noncash-consideration",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频基础",
    "question": "非现金对价如何确定交易价格？",
    "summary": "非现金对价通常按合同开始日公允价值计量；后续区分对价形式本身变化与履约等其他原因。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "收入准则",
      "Markdown同步",
      "非现金对价",
      "交易价格"
    ]
  },
  {
    "id": "revenue-transaction-price-consideration-payable-to-customer",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频提高",
    "question": "应付客户对价如何处理？",
    "summary": "应付客户对价先判断是否取得可区分商品；应冲减部分在相关收入与支付或承诺支付孰晚时点扣减。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "销售商品并单独采购广告：销售",
        "scope": "应付客户对价",
        "condition": "可区分广告公允价值5，销售已履约；不考虑税额",
        "lines": [
          {
            "side": "借",
            "account": "应收账款",
            "amount": "100"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "100"
          }
        ],
        "note": "金额单位：万元；三种情形独立，按相关收入与支付或承诺支付孰晚判断冲减时点。"
      },
      {
        "title": "采购公允价值等于支付额的广告",
        "scope": "应付客户对价",
        "condition": "广告已提供并计入当期销售费用；不考虑税额",
        "lines": [
          {
            "side": "借",
            "account": "销售费用",
            "amount": "5"
          },
          {
            "side": "贷",
            "account": "银行存款 / 应付账款",
            "amount": "5"
          }
        ],
        "note": ""
      },
      {
        "title": "支付额超过广告公允价值",
        "scope": "应付客户对价",
        "condition": "原100收入已确认且达到冲减时点；广告公允价值3，支付5",
        "lines": [
          {
            "side": "借",
            "account": "销售费用",
            "amount": "3"
          },
          {
            "side": "借",
            "account": "主营业务收入",
            "amount": "2"
          },
          {
            "side": "贷",
            "account": "银行存款 / 应付账款",
            "amount": "5"
          }
        ],
        "note": ""
      },
      {
        "title": "销售时扣除应付客户对价",
        "scope": "应付客户对价",
        "condition": "无可区分服务或无法合理估计公允价值；销售前承诺另付5，货款100分别结算；忽略税额",
        "lines": [
          {
            "side": "借",
            "account": "应收账款",
            "amount": "100"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "95"
          },
          {
            "side": "贷",
            "account": "其他应付款——应付客户对价",
            "amount": "5"
          }
        ],
        "note": ""
      },
      {
        "title": "支付已确认的客户对价",
        "scope": "应付客户对价",
        "condition": "沿用前例，支付单独核算的应付金额",
        "lines": [
          {
            "side": "借",
            "account": "其他应付款——应付客户对价",
            "amount": "5"
          },
          {
            "side": "贷",
            "account": "银行存款",
            "amount": "5"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "收入准则",
      "Markdown同步",
      "应付客户对价",
      "交易价格",
      "分录"
    ]
  },
  {
    "id": "revenue-allocation-subsequent-changes",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频综合",
    "question": "交易价格分摊后续变动如何处理？",
    "summary": "分摊以合同开始日单独售价为基础，区分折扣、可变对价归属及合同变更后二次分摊；已履约变动调整当期收入。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "收入准则",
      "Markdown同步",
      "交易价格分摊",
      "后续变动",
      "合同变更"
    ]
  },
  {
    "id": "revenue-material-right-rebates-points",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频综合",
    "question": "销售返利、重大权利和客户积分怎么处理？",
    "summary": "本次价款返利按可变对价，未来额外优惠判断重大权利；积分兑换估计变化调整履约进度，不重分初始交易价格。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "现金返利初始确认",
        "scope": "返利与重大权利",
        "condition": "万元；总价100，预计返利10符合可变对价限制且分别结算",
        "lines": [
          {
            "side": "借",
            "account": "应收账款 / 银行存款",
            "amount": "100"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "90"
          },
          {
            "side": "贷",
            "account": "其他应付款——销售返利",
            "amount": "10"
          }
        ],
        "note": "各例独立，不考虑增值税；销售假设控制权已转移。"
      },
      {
        "title": "支付现金返利",
        "scope": "返利与重大权利",
        "condition": "万元；沿用前例",
        "lines": [
          {
            "side": "借",
            "account": "其他应付款——销售返利",
            "amount": "10"
          },
          {
            "side": "贷",
            "account": "银行存款",
            "amount": "10"
          }
        ],
        "note": ""
      },
      {
        "title": "普通促销销售",
        "scope": "返利与重大权利",
        "condition": "元；当前及以后九折销售分别按100、90确认",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "100 / 90"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "100 / 90"
          }
        ],
        "note": ""
      },
      {
        "title": "结转商品成本",
        "scope": "返利与重大权利",
        "condition": "元；普通券本次/以后为60/55，重大权利本次/以后为60/50",
        "lines": [
          {
            "side": "借",
            "account": "主营业务成本",
            "amount": "实际成本"
          },
          {
            "side": "贷",
            "account": "库存商品",
            "amount": "实际成本"
          }
        ],
        "note": ""
      },
      {
        "title": "重大权利初始分摊",
        "scope": "返利与重大权利",
        "condition": "元；单独售价商品100、选择权24，实际收款100",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "100"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "80.65"
          },
          {
            "side": "贷",
            "account": "合同负债",
            "amount": "19.35"
          }
        ],
        "note": ""
      },
      {
        "title": "重大权利行使并取得商品",
        "scope": "返利与重大权利",
        "condition": "元；客户付60，结转分摊的19.35",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "60"
          },
          {
            "side": "借",
            "account": "合同负债",
            "amount": "19.35"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "79.35"
          }
        ],
        "note": ""
      },
      {
        "title": "重大权利未使用而失效",
        "scope": "返利与重大权利",
        "condition": "元；与行使情形互斥，不重复结转",
        "lines": [
          {
            "side": "借",
            "account": "合同负债",
            "amount": "19.35"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "19.35"
          }
        ],
        "note": ""
      },
      {
        "title": "积分初始分摊",
        "scope": "返利与重大权利",
        "condition": "元；10000积分预计兑换95%；按元取整",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "100000"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "91324"
          },
          {
            "side": "贷",
            "account": "合同负债",
            "amount": "8676"
          }
        ],
        "note": ""
      },
      {
        "title": "2024年积分履约收入",
        "scope": "返利与重大权利",
        "condition": "元；4500/9500×8676，按元取整",
        "lines": [
          {
            "side": "借",
            "account": "合同负债",
            "amount": "4110"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "4110"
          }
        ],
        "note": "预计有权获得未兑换部分，按客户行使模式确认；后续兑换估计变化不重分初始交易价格。"
      },
      {
        "title": "2025年积分履约收入",
        "scope": "返利与重大权利",
        "condition": "元；8500/9700×8676取整为7603，减已确认4110",
        "lines": [
          {
            "side": "借",
            "account": "合同负债",
            "amount": "3493"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "3493"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "收入准则",
      "Markdown同步",
      "重大权利",
      "客户积分",
      "合同负债",
      "分录"
    ]
  },
  {
    "id": "revenue-contract-costs-fulfillment-acquisition-impairment",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频综合",
    "question": "合同履约成本、合同取得成本和减值怎么处理？",
    "summary": "先按适用准则确认履约资产，区分未来资源与已履约耗用；合同资产和合同成本适用不同减值规则。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "归集并结转合同履约成本",
        "scope": "合同成本",
        "condition": "成本对应已履约部分",
        "lines": [
          {
            "side": "借",
            "account": "合同履约成本",
            "amount": "实际发生成本"
          },
          {
            "side": "贷",
            "account": "原材料 / 应付职工薪酬等",
            "amount": "实际发生成本"
          },
          {
            "side": "借",
            "account": "主营业务成本",
            "amount": "已履约部分成本"
          },
          {
            "side": "贷",
            "account": "合同履约成本",
            "amount": "已履约部分成本"
          }
        ],
        "note": "已履约部分全额结转；不属其他准则且满足未来资源等条件的余额才作为合同履约成本资产。"
      },
      {
        "title": "合同取得成本资本化及摊销",
        "scope": "合同成本",
        "condition": "销售佣金等增量成本预期可收回",
        "lines": [
          {
            "side": "借",
            "account": "合同取得成本",
            "amount": "可资本化金额"
          },
          {
            "side": "贷",
            "account": "银行存款 / 应付职工薪酬",
            "amount": "可资本化金额"
          },
          {
            "side": "借",
            "account": "销售费用",
            "amount": "摊销额"
          },
          {
            "side": "贷",
            "account": "合同取得成本",
            "amount": "摊销额"
          }
        ],
        "note": "摊销基础与相关商品或服务转让一致。"
      },
      {
        "title": "合同资产减值及转回",
        "scope": "合同资产",
        "condition": "按金融工具相关准则计量预期信用损失，教材科目用资产减值损失",
        "lines": [
          {
            "side": "借",
            "account": "资产减值损失",
            "amount": "减值额"
          },
          {
            "side": "贷",
            "account": "合同资产减值准备",
            "amount": "减值额"
          },
          {
            "side": "借",
            "account": "合同资产减值准备",
            "amount": "转回额"
          },
          {
            "side": "贷",
            "account": "资产减值损失",
            "amount": "转回额"
          }
        ],
        "note": ""
      },
      {
        "title": "合同成本减值及转回",
        "scope": "合同履约成本 / 合同取得成本",
        "condition": "合同成本账面价值超过预期剩余对价减尚需成本的差额；转回需因素变化并受上限限制",
        "lines": [
          {
            "side": "借",
            "account": "资产减值损失",
            "amount": "减值额"
          },
          {
            "side": "贷",
            "account": "合同履约成本减值准备 / 合同取得成本减值准备",
            "amount": "减值额"
          },
          {
            "side": "借",
            "account": "合同履约成本减值准备 / 合同取得成本减值准备",
            "amount": "转回额"
          },
          {
            "side": "贷",
            "account": "资产减值损失",
            "amount": "转回额"
          }
        ],
        "note": "先测试其他合同相关资产，再测试合同成本资产；相关资产组测试包含减值后的合同成本账面价值。"
      },
      {
        "title": "服务硬件购入",
        "scope": "五年信息中心管理服务；万元，忽略税额",
        "condition": "硬件满足固定资产确认条件。",
        "lines": [
          {
            "side": "借",
            "account": "固定资产",
            "amount": "300"
          },
          {
            "side": "贷",
            "account": "银行存款",
            "amount": "300"
          }
        ],
        "note": ""
      },
      {
        "title": "服务软件购入",
        "scope": "五年信息中心管理服务；万元，忽略税额",
        "condition": "软件满足无形资产确认条件。",
        "lines": [
          {
            "side": "借",
            "account": "无形资产",
            "amount": "200"
          },
          {
            "side": "贷",
            "account": "银行存款",
            "amount": "200"
          }
        ],
        "note": ""
      },
      {
        "title": "平台成本资本化",
        "scope": "五年信息中心管理服务；万元，忽略税额",
        "condition": "不属其他准则范围，满足合同履约成本确认三条件。",
        "lines": [
          {
            "side": "借",
            "account": "合同履约成本",
            "amount": "120"
          },
          {
            "side": "贷",
            "account": "银行存款 / 应付账款等",
            "amount": "120"
          }
        ],
        "note": ""
      },
      {
        "title": "当期服务工资",
        "scope": "五年信息中心管理服务；万元，忽略税额",
        "condition": "工资仅对应当期已提供服务，未形成未来资源。",
        "lines": [
          {
            "side": "借",
            "account": "主营业务成本",
            "amount": "50"
          },
          {
            "side": "贷",
            "account": "应付职工薪酬",
            "amount": "50"
          }
        ],
        "note": ""
      },
      {
        "title": "平台年度摊销",
        "scope": "五年信息中心管理服务；万元，忽略税额",
        "condition": "服务均匀转移，120按五年直线摊销。",
        "lines": [
          {
            "side": "借",
            "account": "主营业务成本",
            "amount": "24"
          },
          {
            "side": "贷",
            "account": "合同履约成本",
            "amount": "24"
          }
        ],
        "note": ""
      },
      {
        "title": "硬件年度折旧",
        "scope": "五年信息中心管理服务；万元，忽略税额",
        "condition": "已可使用，五年直线法、零残值，完整年度用于本期服务。",
        "lines": [
          {
            "side": "借",
            "account": "主营业务成本",
            "amount": "60"
          },
          {
            "side": "贷",
            "account": "累计折旧",
            "amount": "60"
          }
        ],
        "note": ""
      },
      {
        "title": "软件年度摊销",
        "scope": "五年信息中心管理服务；万元，忽略税额",
        "condition": "已可供使用，五年直线法、零残值，完整年度用于本期服务。",
        "lines": [
          {
            "side": "借",
            "account": "主营业务成本",
            "amount": "40"
          },
          {
            "side": "贷",
            "account": "累计摊销",
            "amount": "40"
          }
        ],
        "note": ""
      },
      {
        "title": "建造合同确认收入",
        "scope": "40%进度建造合同；万元，忽略税额",
        "condition": "时段履约，测量进度40%恰当反映控制权转移；收款权无条件时用应收账款，否则用合同资产。",
        "lines": [
          {
            "side": "借",
            "account": "合同资产 / 应收账款",
            "amount": "400"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "400"
          }
        ],
        "note": ""
      },
      {
        "title": "未安装构件购入",
        "scope": "40%进度建造合同；万元，忽略税额",
        "condition": "适用存货准则，未安装且未转移控制权。",
        "lines": [
          {
            "side": "借",
            "account": "原材料等",
            "amount": "60"
          },
          {
            "side": "贷",
            "account": "银行存款等",
            "amount": "60"
          }
        ],
        "note": ""
      },
      {
        "title": "构件以后耗用形成已履约部分",
        "scope": "40%进度建造合同；万元，忽略税额",
        "condition": "原构件已耗用并形成已履约部分。",
        "lines": [
          {
            "side": "借",
            "account": "主营业务成本",
            "amount": "60"
          },
          {
            "side": "贷",
            "account": "原材料等",
            "amount": "60"
          }
        ],
        "note": ""
      },
      {
        "title": "建造非正常消耗费用化",
        "scope": "40%进度建造合同；万元，忽略税额",
        "condition": "合同价格未反映的非正常材料浪费；费用科目按业务性质确定。",
        "lines": [
          {
            "side": "借",
            "account": "当期损失或费用",
            "amount": "10"
          },
          {
            "side": "贷",
            "account": "原材料等",
            "amount": "10"
          }
        ],
        "note": ""
      },
      {
        "title": "总部管理工资",
        "scope": "40%进度建造合同；万元，忽略税额",
        "condition": "总部管理工资不由客户承担。",
        "lines": [
          {
            "side": "借",
            "account": "管理费用",
            "amount": "20"
          },
          {
            "side": "贷",
            "account": "应付职工薪酬",
            "amount": "20"
          }
        ],
        "note": ""
      },
      {
        "title": "建造收入结转",
        "scope": "580万元建造合同",
        "condition": "分别为2018—2021年收入",
        "lines": [
          {
            "side": "借",
            "account": "合同结算——收入结转",
            "amount": "162.4 / 127.6 / 174 / 116"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "162.4 / 127.6 / 174 / 116"
          }
        ],
        "note": "单位万元；多年度金额按列示顺序分别使用，不是同一笔同时入账。"
      },
      {
        "title": "建造价款转入应收",
        "scope": "580万元建造合同",
        "condition": "分别为2018、2019、2020、2022年；2021核定质保金时尚无无条件权利",
        "lines": [
          {
            "side": "借",
            "account": "应收账款",
            "amount": "174 / 196 / 180 / 30"
          },
          {
            "side": "贷",
            "account": "合同结算——价款结算",
            "amount": "174 / 196 / 180 / 30"
          }
        ],
        "note": ""
      },
      {
        "title": "建造合同收款",
        "scope": "580万元建造合同",
        "condition": "分别为2018、2019、2020、2022年收款",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "170 / 190 / 190 / 30"
          },
          {
            "side": "贷",
            "account": "应收账款",
            "amount": "170 / 190 / 190 / 30"
          }
        ],
        "note": ""
      },
      {
        "title": "建造实际成本结转",
        "scope": "580万元建造合同",
        "condition": "分别为2018—2021年已履约工程成本",
        "lines": [
          {
            "side": "借",
            "account": "主营业务成本",
            "amount": "154 / 146 / 188 / 122"
          },
          {
            "side": "贷",
            "account": "合同履约成本",
            "amount": "154 / 146 / 188 / 122"
          }
        ],
        "note": ""
      },
      {
        "title": "2019亏损合同计提",
        "scope": "580万元建造合同",
        "condition": "期末无标的资产；继续履约为最低净成本",
        "lines": [
          {
            "side": "借",
            "account": "主营业务成本",
            "amount": "10"
          },
          {
            "side": "贷",
            "account": "预计负债",
            "amount": "10"
          }
        ],
        "note": ""
      },
      {
        "title": "2020亏损合同转回",
        "scope": "580万元建造合同",
        "condition": "预计负债由10减至6",
        "lines": [
          {
            "side": "借",
            "account": "预计负债",
            "amount": "4"
          },
          {
            "side": "贷",
            "account": "主营业务成本",
            "amount": "4"
          }
        ],
        "note": ""
      },
      {
        "title": "2021完工转回",
        "scope": "580万元建造合同",
        "condition": "完工无剩余未履约亏损",
        "lines": [
          {
            "side": "借",
            "account": "预计负债",
            "amount": "6"
          },
          {
            "side": "贷",
            "account": "主营业务成本",
            "amount": "6"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "收入准则",
      "Markdown同步",
      "合同资产",
      "合同履约成本",
      "合同取得成本",
      "减值",
      "亏损合同",
      "分录"
    ]
  },
  {
    "id": "revenue-transportation-costs",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频易错",
    "question": "合同履约成本中的运费怎么判断？",
    "summary": "运输先看客户合同及控制权时点，再判断独立服务、存货成本或期间费用；内部调拨不自动费用化。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "收入准则",
      "Markdown同步",
      "合同履约成本",
      "运费"
    ]
  },
  {
    "id": "revenue-sales-with-right-of-return",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频综合",
    "question": "附有销售退回条款的销售如何处理？",
    "summary": "附退货权销售分别计量收入、退款负债和应收退货成本；持续重估，并区分收入限制与融资条件。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "销售确认收入及退款义务",
        "scope": "100件商品退货例",
        "condition": "售价100、成本60，退10件，收回费用80，无减损；13%为题设税率，销售全额计税，退货满足销项税冲减条件。",
        "lines": [
          {
            "side": "借",
            "account": "应收账款",
            "amount": "11300"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "9000"
          },
          {
            "side": "贷",
            "account": "预计负债——应付退货款",
            "amount": "1000"
          },
          {
            "side": "贷",
            "account": "应交税费——应交增值税（销项税额）",
            "amount": "1300"
          }
        ],
        "note": "单位元；实际退货数、费用与估计一致，差异另行重估。"
      },
      {
        "title": "销售结转成本",
        "scope": "100件商品退货例",
        "condition": "售价100、成本60，退10件，收回费用80，无减损；13%为题设税率，销售全额计税，退货满足销项税冲减条件。",
        "lines": [
          {
            "side": "借",
            "account": "主营业务成本",
            "amount": "5480"
          },
          {
            "side": "借",
            "account": "应收退货成本",
            "amount": "520"
          },
          {
            "side": "贷",
            "account": "库存商品",
            "amount": "6000"
          }
        ],
        "note": ""
      },
      {
        "title": "实际退货退款并冲减税额",
        "scope": "100件商品退货例",
        "condition": "售价100、成本60，退10件，收回费用80，无减损；13%为题设税率，销售全额计税，退货满足销项税冲减条件。",
        "lines": [
          {
            "side": "借",
            "account": "预计负债——应付退货款",
            "amount": "1000"
          },
          {
            "side": "借",
            "account": "应交税费——应交增值税（销项税额）",
            "amount": "130"
          },
          {
            "side": "贷",
            "account": "银行存款 / 应收账款",
            "amount": "1130"
          }
        ],
        "note": ""
      },
      {
        "title": "实际收回商品并支付收回费用",
        "scope": "100件商品退货例",
        "condition": "售价100、成本60，退10件，收回费用80，无减损；13%为题设税率，销售全额计税，退货满足销项税冲减条件。",
        "lines": [
          {
            "side": "借",
            "account": "库存商品",
            "amount": "600"
          },
          {
            "side": "贷",
            "account": "应收退货成本",
            "amount": "520"
          },
          {
            "side": "贷",
            "account": "银行存款等",
            "amount": "80"
          }
        ],
        "note": ""
      },
      {
        "title": "退货估计受限时转出存货",
        "scope": "退货估计受限与融资",
        "condition": "新品无可用信息，本例所有对价均未通过限制；无收回成本及减损",
        "lines": [
          {
            "side": "借",
            "account": "应收退货成本",
            "amount": "8000"
          },
          {
            "side": "贷",
            "account": "库存商品",
            "amount": "8000"
          }
        ],
        "note": "单位元；未确认合同资产及应收款期间不确认本例融资影响；后续另评估应收款减值。"
      },
      {
        "title": "90天退货期满确认延期收款",
        "scope": "退货估计受限与融资",
        "condition": "未退货；合同开始与期满应收款公允价值无重大差异，忽略税费",
        "lines": [
          {
            "side": "借",
            "account": "长期应收款",
            "amount": "12100"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "10000"
          },
          {
            "side": "贷",
            "account": "未实现融资收益",
            "amount": "2100"
          }
        ],
        "note": ""
      },
      {
        "title": "退货期满结转商品成本",
        "scope": "退货估计受限与融资",
        "condition": "沿用12100延期收款例",
        "lines": [
          {
            "side": "借",
            "account": "主营业务成本",
            "amount": "8000"
          },
          {
            "side": "贷",
            "account": "应收退货成本",
            "amount": "8000"
          }
        ],
        "note": ""
      },
      {
        "title": "退货期满后摊销融资收益",
        "scope": "退货估计受限与融资",
        "condition": "从期满后按剩余期限确定实际利率，不机械采用完整两年利率",
        "lines": [
          {
            "side": "借",
            "account": "未实现融资收益",
            "amount": "当期实际利息"
          },
          {
            "side": "贷",
            "account": "财务费用等",
            "amount": "当期实际利息"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "收入准则",
      "Markdown同步",
      "销售退回",
      "可变对价",
      "应收退货成本",
      "分录"
    ]
  },
  {
    "id": "revenue-principal-vs-agent",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频基础",
    "question": "主要责任人和代理人如何区分？",
    "summary": "转让前控制特定商品或服务的按总额确认；代理人按佣金净额确认，主要责任、存货风险和定价权仅为判断迹象。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "代理人代收代付确认净额收入",
        "scope": "主要责任人和代理人",
        "condition": "元；平台转让前不控制手机，已完成代理服务，代收1000、佣金100",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "1000"
          },
          {
            "side": "贷",
            "account": "其他应付款",
            "amount": "900"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "100"
          }
        ],
        "note": "平台作为代理人按净额确认佣金收入。"
      },
      {
        "title": "主要责任人手机销售",
        "scope": "主要责任人和代理人如何区分？",
        "condition": "元；按手机例，总额和净额两情形分别使用",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "1000"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "1000"
          }
        ],
        "note": "按正文情形分别核算，忽略税额；替代情形不重复入账。"
      },
      {
        "title": "主要责任人结转手机成本",
        "scope": "主要责任人和代理人如何区分？",
        "condition": "元；按手机例，总额和净额两情形分别使用",
        "lines": [
          {
            "side": "借",
            "account": "主营业务成本",
            "amount": "700"
          },
          {
            "side": "贷",
            "account": "库存商品",
            "amount": "700"
          }
        ],
        "note": ""
      },
      {
        "title": "代理人仅收佣金",
        "scope": "主要责任人和代理人如何区分？",
        "condition": "元；按手机例，总额和净额两情形分别使用",
        "lines": [
          {
            "side": "借",
            "account": "银行存款 / 应收账款",
            "amount": "100"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "100"
          }
        ],
        "note": ""
      },
      {
        "title": "代理人支付代收款",
        "scope": "主要责任人和代理人如何区分？",
        "condition": "元；按手机例，总额和净额两情形分别使用",
        "lines": [
          {
            "side": "借",
            "account": "其他应付款",
            "amount": "900"
          },
          {
            "side": "贷",
            "account": "银行存款",
            "amount": "900"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "收入准则",
      "Markdown同步",
      "主要责任人",
      "代理人",
      "总额法",
      "净额法",
      "分录"
    ]
  },
  {
    "id": "revenue-ip-license-special-rules",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频综合",
    "question": "授予知识产权许可如何确认收入？",
    "summary": "许可先识别履约义务，再按重大影响活动、客户受影响和活动不另转让商品三条件判断时段；固定费与提成分别计量。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "预收全年固定授权费",
        "scope": "授予知识产权许可如何确认收入？",
        "condition": "万元；全年均匀履约，满足时段三条件",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "100"
          },
          {
            "side": "贷",
            "account": "合同负债",
            "amount": "100"
          }
        ],
        "note": "按正文情形分别核算，忽略税额；替代情形不重复入账。"
      },
      {
        "title": "固定费逐月确认",
        "scope": "授予知识产权许可如何确认收入？",
        "condition": "万元；前11个月各8.33，末月8.37，合计100",
        "lines": [
          {
            "side": "借",
            "account": "合同负债",
            "amount": "8.33 / 8.37"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "8.33 / 8.37"
          }
        ],
        "note": ""
      },
      {
        "title": "销售600提成确认",
        "scope": "授予知识产权许可如何确认收入？",
        "condition": "万元；600×5%，客户实际销售且对应履约满足",
        "lines": [
          {
            "side": "借",
            "account": "应收账款",
            "amount": "30"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "30"
          }
        ],
        "note": ""
      },
      {
        "title": "收到提成款",
        "scope": "授予知识产权许可如何确认收入？",
        "condition": "万元；沿用已确认30的提成",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "30"
          },
          {
            "side": "贷",
            "account": "应收账款",
            "amount": "30"
          }
        ],
        "note": ""
      },
      {
        "title": "延后开放许可的提成",
        "scope": "授予知识产权许可如何确认收入？",
        "condition": "万元；实际销售200×5%，待相关履约条件满足，不能仅凭开放日",
        "lines": [
          {
            "side": "借",
            "account": "应收账款",
            "amount": "10"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "10"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "收入准则",
      "Markdown同步",
      "知识产权许可",
      "IP提成",
      "固定授权费",
      "分录"
    ]
  },
  {
    "id": "revenue-repurchase-arrangements",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频易错",
    "question": "售后回购如何判断是销售、租赁还是融资？",
    "summary": "先区分企业回购义务或回购权与客户回售权；仅客户回售权先判行权动力，再按条件分类租赁、融资或退货销售。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "收到融资款",
        "scope": "售后回购融资",
        "condition": "万元；企业回购义务，收到100、支付105；忽略税额且利息不符合资本化条件。",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "100"
          },
          {
            "side": "贷",
            "account": "其他应付款——回购融资款",
            "amount": "100"
          }
        ],
        "note": ""
      },
      {
        "title": "回购期间确认利息",
        "scope": "售后回购融资",
        "condition": "万元；企业回购义务，收到100、支付105；忽略税额且利息不符合资本化条件。",
        "lines": [
          {
            "side": "借",
            "account": "财务费用",
            "amount": "5"
          },
          {
            "side": "贷",
            "account": "其他应付款——回购融资款",
            "amount": "5"
          }
        ],
        "note": "5为全回购期间利息合计，应按适用期间确认；不确认商品销售收入和销售成本。"
      },
      {
        "title": "实际回购偿付",
        "scope": "售后回购融资",
        "condition": "万元；企业回购义务，收到100、支付105；忽略税额且利息不符合资本化条件。",
        "lines": [
          {
            "side": "借",
            "account": "其他应付款——回购融资款",
            "amount": "105"
          },
          {
            "side": "贷",
            "account": "银行存款",
            "amount": "105"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "收入准则",
      "Markdown同步",
      "售后回购",
      "租赁交易",
      "融资交易",
      "分录"
    ]
  },
  {
    "id": "revenue-customer-unexercised-rights",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频综合",
    "question": "客户未行使的权利如何确认收入？",
    "summary": "不可退预收款的未行使部分，满足有权取得预期时按行使模式确认；收入、实际消费税额及到期余额分别判断。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "销售储值卡确认合同负债和待转销项税额",
        "scope": "客户未行使权利",
        "condition": "2025教学例，卡款1000000；题设13%，实际消费时产生销项税，按元取整",
        "lines": [
          {
            "side": "借",
            "account": "库存现金 / 银行存款",
            "amount": "1000000"
          },
          {
            "side": "贷",
            "account": "合同负债",
            "amount": "884956"
          },
          {
            "side": "贷",
            "account": "应交税费--待转销项税额",
            "amount": "115044"
          }
        ],
        "note": ""
      },
      {
        "title": "储值卡消费并确认 breakage 收入",
        "scope": "客户未行使权利",
        "condition": "实际消费 400000，预计不使用 50000",
        "lines": [
          {
            "side": "借",
            "account": "合同负债",
            "amount": "372613"
          },
          {
            "side": "借",
            "account": "应交税费--待转销项税额",
            "amount": "46018"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "372613"
          },
          {
            "side": "贷",
            "account": "应交税费--应交增值税（销项税额）",
            "amount": "46018"
          }
        ],
        "note": "收入按400000/950000行使比例计算；销项税46018仅由400000/1.13×13%得出，两者基数不同。"
      },
      {
        "title": "储值卡到期未消费：转出剩余待转销项税额",
        "scope": "客户未行使权利",
        "condition": "仅原教学变式：卡款500万元，最终消费460；无退款、继续履约及相应增值税义务，未消费款归企业",
        "lines": [
          {
            "side": "借",
            "account": "应交税费--待转销项税额",
            "amount": "4.60"
          },
          {
            "side": "贷",
            "account": "营业外收入",
            "amount": "4.60"
          }
        ],
        "note": "原教学例科目处理，非卡面到期自动适用；金额4.60万元，精确余额按实际账簿核算。"
      },
      {
        "title": "不含税充值确认负债",
        "scope": "客户未行使权利",
        "condition": "元；充值1000，预计有权取得未使用100，实际消费450，忽略税额",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "1000"
          },
          {
            "side": "贷",
            "account": "合同负债",
            "amount": "1000"
          }
        ],
        "note": ""
      },
      {
        "title": "不含税简例履约及未使用部分",
        "scope": "客户未行使权利",
        "condition": "元；充值1000，预计有权取得未使用100，实际消费450，忽略税额",
        "lines": [
          {
            "side": "借",
            "account": "合同负债",
            "amount": "500"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "500"
          }
        ],
        "note": "500＝450＋100×450/900。"
      }
    ],
    "tags": [
      "收入准则",
      "Markdown同步",
      "客户未行使权利",
      "breakage",
      "储值卡",
      "待转销项税额",
      "分录"
    ]
  },
  {
    "id": "revenue-nonrefundable-upfront-fee",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频易错",
    "question": "无需退回的初始费如何确认收入？",
    "summary": "不可退初始费计入交易价格，按所对应履约义务确认；内部准备不形成收入，平均摊销须有履约基础。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "平台初始费预收",
        "scope": "不可退初始费",
        "condition": "仅对应未来12个月均匀接入服务，无续约重大权利",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "600"
          },
          {
            "side": "贷",
            "account": "合同负债",
            "amount": "600"
          }
        ],
        "note": "单位元；各例独立、忽略税额，按实际履约确认。"
      },
      {
        "title": "平台按月履约",
        "scope": "不可退初始费",
        "condition": "沿用600/12例",
        "lines": [
          {
            "side": "借",
            "account": "合同负债",
            "amount": "50"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "50"
          }
        ],
        "note": ""
      },
      {
        "title": "含设备合同初始收款",
        "scope": "不可退初始费",
        "condition": "总收1000，设备分摊800，余200对应其他义务",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "1000"
          },
          {
            "side": "贷",
            "account": "合同负债",
            "amount": "1000"
          }
        ],
        "note": ""
      },
      {
        "title": "设备控制权转移",
        "scope": "不可退初始费",
        "condition": "设备可明确区分，800为分摊结果而非只看单独售价",
        "lines": [
          {
            "side": "借",
            "account": "合同负债",
            "amount": "800"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "800"
          }
        ],
        "note": ""
      },
      {
        "title": "设备成本结转",
        "scope": "不可退初始费",
        "condition": "设备成本500",
        "lines": [
          {
            "side": "借",
            "account": "主营业务成本",
            "amount": "500"
          },
          {
            "side": "贷",
            "account": "库存商品",
            "amount": "500"
          }
        ],
        "note": ""
      },
      {
        "title": "健身年费及入会费",
        "scope": "不可退初始费",
        "condition": "1200+300，仅对应12个月均匀服务，无续约重大权利",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "1500"
          },
          {
            "side": "贷",
            "account": "合同负债",
            "amount": "1500"
          }
        ],
        "note": ""
      },
      {
        "title": "健身服务按月履约",
        "scope": "不可退初始费",
        "condition": "1500/12",
        "lines": [
          {
            "side": "借",
            "account": "合同负债",
            "amount": "125"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "125"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "收入准则",
      "Markdown同步",
      "初始费",
      "合同负债",
      "单项履约义务",
      "分录"
    ]
  },
  {
    "id": "revenue-refund-liability-vs-other-payables",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频易错",
    "question": "退款负债、预计负债、其他应付款和合同负债怎么区分？",
    "summary": "退钱义务与交货义务不同；退款科目按业务和结算安排判断，不以尚需估计或是否已收款作唯一标准。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [],
    "tags": [
      "收入准则",
      "Markdown同步",
      "退款负债",
      "预计负债",
      "其他应付款",
      "合同负债",
      "销售返利"
    ]
  },
  {
    "id": "revenue-contract-asset-foreign-currency-nonmonetary-vs-receivable",
    "updatedAt": "2026-09-07",
    "topic": "收入准则",
    "difficulty": "高频易错",
    "question": "合同资产转为应收账款，是否就决定了外币折算方法？",
    "summary": "收款权是否无条件决定合同资产或应收账款列报；外币货币性另按固定或可确定金额收取的定义判断，不能仅看科目。",
    "conclusion": [
      "合同资产：已转让商品或服务，但收款还取决于时间流逝之外的条件；应收账款：只需等待付款日。",
      "外币折算另按准则19第11条判断：将以固定或可确定金额货币收取的资产属于货币性项目；不能仅因权利附有履约条件就断定非货币性。"
    ],
    "reasoning": [
      "设计完成后须安装才可收款：设计部分先列合同资产，安装条件满足再转应收账款；还须另查对价是否以固定或可确定外币金额结算。",
      "按上述定义，若该项已确认对价权利满足固定或可确定外币金额收取的条件，应按货币性项目折算，无须等改列应收账款才开始调汇；若不满足，则按其实际性质与计量基础处理。此判断来自准则定义，不是对所有合同资产统一定性。",
      "货币性项目期末按即期汇率折算，汇兑差额通常计当期损益；历史成本非货币性项目按交易日汇率，公允价值非货币性项目按公允价值确定日汇率。具体折算规则集中见外币折算章。"
    ],
    "memory": [],
    "pitfalls": [
      "合同资产的预期信用损失计量不替代货币性分类判断；转应收时不能机械照抄未按适用准则更新的旧人民币金额。"
    ],
    "journalEntries": [
      {
        "title": "履约但收款权尚附其他条件：确认合同资产",
        "scope": "合同资产与应收账款",
        "condition": "已转让商品或服务，但还须完成后续安装等条件才有权收款",
        "lines": [
          {
            "side": "借",
            "account": "合同资产",
            "amount": "按已履约部分的交易价格"
          },
          {
            "side": "贷",
            "account": "主营业务收入",
            "amount": "按已履约部分的交易价格"
          }
        ],
        "note": "先按收入准则确认和列报，再依据结算条款及外币准则确定折算；不预设合同资产均不调汇。"
      },
      {
        "title": "收款权利无条件时：合同资产转为应收账款",
        "scope": "合同资产与应收账款",
        "condition": "除时间流逝外不再需要满足其他条件",
        "lines": [
          {
            "side": "借",
            "account": "应收账款",
            "amount": "按适用准则更新后的合同资产账面余额"
          },
          {
            "side": "贷",
            "account": "合同资产",
            "amount": "按适用准则更新后的合同资产账面余额"
          }
        ],
        "note": "转出金额应为按适用准则更新后的账面余额；相关减值准备另作相应处理，不能遗漏汇率变动应有影响。"
      }
    ],
    "tags": [
      "收入准则",
      "合同资产",
      "应收账款",
      "外币折算",
      "货币性项目",
      "非货币性项目",
      "汇兑差额",
      "分录"
    ]
  }
];
