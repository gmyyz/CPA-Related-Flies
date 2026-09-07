// 此文件由专题维护；不要把所有卡片重新合并到单一文件。
export default [
  {
    "id": "long-term-equity-investment-step-acquisition-non-common-control",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "系统补齐",
    "question": "多次交易形成非同一控制下企业合并怎么理解？",
    "summary": "分步非同控：个别报表先辨原投资类别；合并报表按购买日公允价值重计量原股权。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "长期股权投资",
      "多次交易形成非同一控制下企业合并",
      "FVTPL",
      "其他权益工具投资",
      "权益法长期股权投资",
      "投资收益",
      "公允价值变动损益",
      "留存收益",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-step-acquisition-transaction-costs",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "高频易错",
    "question": "分步实现企业合并时，实现合并那次的交易费用怎么处理？",
    "summary": "合并中介费用计入当期损益；发行证券费用和非合并取得长投费用分别处理。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "原交易性金融资产转换前调到公允价值",
        "scope": "个别报表",
        "condition": "追加投资日前公允价值由 1,240 上升至 1,280。",
        "lines": [
          {
            "side": "借",
            "account": "交易性金融资产--公允价值变动",
            "amount": "40"
          },
          {
            "side": "贷",
            "account": "公允价值变动损益",
            "amount": "40"
          }
        ],
        "note": ""
      },
      {
        "title": "确认成本法长期股权投资",
        "scope": "个别报表",
        "condition": "原 10% 股权公允价值 1,280，新增 40% 支付对价 3,840。",
        "lines": [
          {
            "side": "借",
            "account": "长期股权投资",
            "amount": "5,120"
          },
          {
            "side": "贷",
            "account": "交易性金融资产",
            "amount": "1,280"
          },
          {
            "side": "贷",
            "account": "银行存款",
            "amount": "3,840"
          }
        ],
        "note": ""
      },
      {
        "title": "取得控制那次交易费用",
        "scope": "个别报表",
        "condition": "追加投资形成企业合并时发生交易费用 20。",
        "lines": [
          {
            "side": "借",
            "account": "管理费用",
            "amount": "20"
          },
          {
            "side": "贷",
            "account": "银行存款",
            "amount": "20"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "长期股权投资",
      "分步实现企业合并",
      "交易费用",
      "管理费用",
      "非同一控制下企业合并",
      "交易性金融资产",
      "公允价值变动损益",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-step-acquisition-common-control",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "高频易错",
    "question": "多次交易形成同一控制下企业合并怎么理解？",
    "summary": "同控长投以最终控制方账面净资产份额及承继商誉计量，与账面对价之差调整权益。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "长期股权投资",
      "多次交易形成同一控制下企业合并",
      "资本公积",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-common-control-fv-original-fixed-asset-consideration",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "高频易错",
    "question": "原投资按公允价值计量，新增固定资产对价形成同一控制下企业合并怎么处理？",
    "summary": "同控追加投资：原金融资产先按原分类计量，新增固定资产对价按账面价值转出。",
    "conclusion": [
      "原交易性金融资产账面1,200、合并日公允价值1,300；新增固定资产原价10,000、累计折旧2,000，忽略税费。",
      "按同控规则确定长投初始成本10,500；资本溢价＝10,500－1,300－8,000＝1,200，单位万元。"
    ],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "原交易性金融资产调至合并日公允价值",
        "scope": "个别报表",
        "condition": "原交易性金融资产账面价值 1,200，合并日公允价值 1,300",
        "lines": [
          {
            "side": "借",
            "account": "交易性金融资产--公允价值变动",
            "amount": "100"
          },
          {
            "side": "贷",
            "account": "公允价值变动损益",
            "amount": "100"
          }
        ],
        "note": ""
      },
      {
        "title": "新增固定资产对价转入清理",
        "scope": "个别报表",
        "condition": "固定资产原价 10,000，累计折旧 2,000，账面价值 8,000",
        "lines": [
          {
            "side": "借",
            "account": "固定资产清理",
            "amount": "8,000"
          },
          {
            "side": "借",
            "account": "累计折旧",
            "amount": "2,000"
          },
          {
            "side": "贷",
            "account": "固定资产",
            "amount": "10,000"
          }
        ],
        "note": ""
      },
      {
        "title": "确认同一控制下长期股权投资",
        "scope": "个别报表",
        "condition": "长投初始成本 10,500，原金融资产账面 1,300，固定资产清理 8,000",
        "lines": [
          {
            "side": "借",
            "account": "长期股权投资",
            "amount": "10,500"
          },
          {
            "side": "贷",
            "account": "交易性金融资产",
            "amount": "1,300"
          },
          {
            "side": "贷",
            "account": "固定资产清理",
            "amount": "8,000"
          },
          {
            "side": "贷",
            "account": "资本公积--资本溢价或股本溢价",
            "amount": "1,200"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "长期股权投资",
      "同一控制下企业合并",
      "交易性金融资产",
      "固定资产对价",
      "公允价值变动损益",
      "资产处置收益",
      "资本公积",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-equity-method-oci-capital-reserve-disposal",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "系统补齐",
    "question": "权益法下长期股权投资：其他综合收益和其他资本公积的去向怎么理解？",
    "summary": "权益法处置：OCI 按来源处理，其他资本公积转投资收益；结转范围看处置后核算方法。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "长期股权投资",
      "权益法下长期股权投资",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-oci-disposal-summary",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "系统补齐",
    "question": "其他综合收益的主要去向总表怎么理解？",
    "summary": "其他综合收益先辨来源，再确定转损益、转留存收益、调整成本或保留的处理。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "长期股权投资",
      "其他综合收益的主要去向总表",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-bargain-purchase-cost-vs-equity-method",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "系统补齐",
    "question": "非同一控制下买便宜时：成本法和权益法的营业外收入差异怎么理解？",
    "summary": "买便宜形成的收益：控股合并在合并报表确认；权益法和吸收合并在个别报表确认。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "长期股权投资",
      "非同一控制下买便宜时",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-equity-method-preference-shares",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "系统补齐",
    "question": "权益法确认净损益份额：潜在表决权和优先股股利扣除怎么理解？",
    "summary": "权益法份额不提前计入潜在表决权；归属普通股的利润须先扣除适用的优先股股利。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "长期股权投资",
      "潜在表决权",
      "优先股股利扣除",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-equity-method-excess-losses",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "高频易错",
    "question": "权益法超额亏损时，长期应收款、预计负债和备查簿怎么处理？",
    "summary": "权益法亏损先冲长投及其他长期权益；额外义务须另行判断，未确认损失按来源备查。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "净亏损导致超额亏损",
        "scope": "个别报表",
        "condition": "应分担亏损 800，长期股权投资 600，长期应收款 120，无额外义务",
        "lines": [
          {
            "side": "借",
            "account": "投资收益",
            "amount": "720"
          },
          {
            "side": "贷",
            "account": "长期股权投资--损益调整",
            "amount": "600"
          },
          {
            "side": "贷",
            "account": "长期应收款",
            "amount": "120"
          }
        ],
        "note": ""
      },
      {
        "title": "净亏损线后续 OCI 增加",
        "scope": "个别报表",
        "condition": "前期备查亏损 80，后续应享有 OCI 增加 60",
        "lines": [
          {
            "side": "借",
            "account": "长期股权投资--其他综合收益",
            "amount": "60"
          },
          {
            "side": "贷",
            "account": "其他综合收益",
            "amount": "60"
          },
          {
            "side": "借",
            "account": "投资收益",
            "amount": "60"
          },
          {
            "side": "贷",
            "account": "长期股权投资--损益调整",
            "amount": "60"
          }
        ],
        "note": ""
      },
      {
        "title": "净亏损线后续 OCI 增加超过备查亏损",
        "scope": "个别报表",
        "condition": "前期备查亏损 80，后续应享有 OCI 增加 160",
        "lines": [
          {
            "side": "借",
            "account": "长期股权投资--其他综合收益",
            "amount": "160"
          },
          {
            "side": "贷",
            "account": "其他综合收益",
            "amount": "160"
          },
          {
            "side": "借",
            "account": "投资收益",
            "amount": "80"
          },
          {
            "side": "贷",
            "account": "长期股权投资--损益调整",
            "amount": "80"
          },
          {
            "side": "借",
            "account": "长期应收款",
            "amount": "80"
          },
          {
            "side": "贷",
            "account": "长期股权投资--其他综合收益",
            "amount": "80"
          }
        ],
        "note": ""
      },
      {
        "title": "OCI 减少导致超额亏损",
        "scope": "个别报表",
        "condition": "应分担 OCI 减少 800，长期股权投资 600，长期应收款 120，无额外义务",
        "lines": [
          {
            "side": "借",
            "account": "其他综合收益",
            "amount": "720"
          },
          {
            "side": "贷",
            "account": "长期股权投资--其他综合收益",
            "amount": "600"
          },
          {
            "side": "贷",
            "account": "长期应收款",
            "amount": "120"
          }
        ],
        "note": ""
      },
      {
        "title": "OCI 线后续 OCI 增加并恢复长期应收款",
        "scope": "个别报表",
        "condition": "前期备查亏损 80，后续应享有 OCI 增加 140",
        "lines": [
          {
            "side": "借",
            "account": "长期股权投资--其他综合收益",
            "amount": "140"
          },
          {
            "side": "贷",
            "account": "其他综合收益",
            "amount": "140"
          },
          {
            "side": "借",
            "account": "其他综合收益",
            "amount": "80"
          },
          {
            "side": "贷",
            "account": "长期股权投资--其他综合收益",
            "amount": "80"
          },
          {
            "side": "借",
            "account": "长期应收款",
            "amount": "60"
          },
          {
            "side": "贷",
            "account": "长期股权投资--其他综合收益",
            "amount": "60"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "长期股权投资",
      "权益法",
      "超额亏损",
      "长期应收款",
      "预计负债",
      "备查簿",
      "其他综合收益",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-vc-indirect-fvtpl-exemption",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "高频易错",
    "question": "联营企业投资中，风险投资机构等间接持有部分能否不采用权益法？",
    "summary": "联营投资通过风投等主体间接持有的部分可选 FVTPL，其余部分仍按权益法。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "长期股权投资",
      "权益法",
      "风险投资机构",
      "共同基金",
      "信托公司",
      "投连险基金",
      "FVTPL",
      "FVOCI",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-joint-venture-vs-joint-operation",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "高频基础",
    "question": "合营安排如何区分共同经营和合营企业？",
    "summary": "合营企业享有净资产权利；共同经营享有资产权利并承担负债义务。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "长期股权投资",
      "合营企业",
      "共同经营",
      "共同控制",
      "合营安排",
      "单独主体",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-joint-operation-downstream-fixed-asset",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "高频易错",
    "question": "共同经营中，合营方向共同经营出售固定资产的分录怎么做？",
    "summary": "共同经营中，未实现资产交易损益按自己份额抵销；业务份额收购适用企业合并相关原则。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "长期股权投资",
      "共同经营",
      "内部交易",
      "固定资产",
      "资产处置收益",
      "构成业务",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-equity-method-internal-transaction-not-business",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "系统补齐",
    "question": "权益法下内部交易不构成业务：收益抵销和减值损失确认怎么理解？",
    "summary": "普通未实现内部交易损益按持股比例抵销；真实减值不抵销。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "长期股权投资",
      "权益法下内部交易不构成业务",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-equity-method-upstream-downstream-transactions",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "系统补齐",
    "question": "权益法下关联方交易：顺流、逆流、存货和资产交易怎么理解？",
    "summary": "权益法个别报表抵销自己份额的未实现损益，合并报表再按顺逆流调整列报项目。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "长期股权投资",
      "权益法下关联方交易",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-loss-control-cost-to-equity-method",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "高频综合",
    "question": "丧失控制权后成本法转权益法，完整分录和逻辑怎么理解？",
    "summary": "丧控后仍用权益法：个别报表追溯剩余股权，合并报表按丧控日公允价值重计量。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "主动出售部分股权",
        "scope": "个别报表",
        "condition": "原持有 100% 成本 600，出售 60% 取得 480",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "480"
          },
          {
            "side": "贷",
            "account": "长期股权投资",
            "amount": "360"
          },
          {
            "side": "贷",
            "account": "投资收益",
            "amount": "120"
          }
        ],
        "note": ""
      },
      {
        "title": "被动稀释导致丧失控制权",
        "scope": "个别报表",
        "condition": "其他投资方增资 800，持股由 60% 降至 40%，原成本 900",
        "lines": [
          {
            "side": "借",
            "account": "长期股权投资--投资成本",
            "amount": "320"
          },
          {
            "side": "贷",
            "account": "长期股权投资--投资成本",
            "amount": "300"
          },
          {
            "side": "贷",
            "account": "投资收益",
            "amount": "20"
          }
        ],
        "note": ""
      },
      {
        "title": "剩余股权追溯权益法",
        "scope": "个别报表",
        "condition": "剩余 40%，以前期间净利润 50，OCI 25",
        "lines": [
          {
            "side": "借",
            "account": "长期股权投资--损益调整",
            "amount": "20"
          },
          {
            "side": "借",
            "account": "长期股权投资--其他综合收益",
            "amount": "10"
          },
          {
            "side": "贷",
            "account": "利润分配--未分配利润",
            "amount": "20"
          },
          {
            "side": "贷",
            "account": "其他综合收益",
            "amount": "10"
          }
        ],
        "note": ""
      },
      {
        "title": "剩余股权按公允价值重新计量",
        "scope": "合并报表",
        "condition": "剩余 40% 公允价值 320，持续计算账面价值 270",
        "lines": [
          {
            "side": "借",
            "account": "长期股权投资",
            "amount": "320"
          },
          {
            "side": "贷",
            "account": "长期股权投资",
            "amount": "270"
          },
          {
            "side": "贷",
            "account": "投资收益",
            "amount": "50"
          }
        ],
        "note": ""
      },
      {
        "title": "调整部分处置收益归属期间",
        "scope": "合并报表",
        "condition": "出售 60% 对应以前期间净利润 30、OCI 15",
        "lines": [
          {
            "side": "借",
            "account": "投资收益",
            "amount": "45"
          },
          {
            "side": "贷",
            "account": "未分配利润",
            "amount": "30"
          },
          {
            "side": "贷",
            "account": "其他综合收益",
            "amount": "15"
          }
        ],
        "note": ""
      },
      {
        "title": "不可转损益 OCI 转出",
        "scope": "合并报表",
        "condition": "原子公司其他权益工具投资形成 OCI 25",
        "lines": [
          {
            "side": "借",
            "account": "其他综合收益",
            "amount": "25"
          },
          {
            "side": "贷",
            "account": "利润分配--未分配利润",
            "amount": "25"
          }
        ],
        "note": ""
      },
      {
        "title": "可转损益 OCI 转出",
        "scope": "合并报表",
        "condition": "原子公司其他债权投资等形成 OCI 25",
        "lines": [
          {
            "side": "借",
            "account": "其他综合收益",
            "amount": "25"
          },
          {
            "side": "贷",
            "account": "投资收益",
            "amount": "25"
          }
        ],
        "note": ""
      },
      {
        "title": "其他所有者权益变动转出",
        "scope": "合并报表",
        "condition": "原子公司因权益结算股份支付确认资本公积 400，母公司原持股 90%",
        "lines": [
          {
            "side": "借",
            "account": "资本公积--其他资本公积",
            "amount": "360"
          },
          {
            "side": "贷",
            "account": "投资收益",
            "amount": "360"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "长期股权投资",
      "成本法转权益法",
      "丧失控制权",
      "主动出售",
      "被动稀释",
      "合并报表投资收益",
      "其他综合收益",
      "其他债权投资",
      "权益结算股份支付",
      "资本公积--其他资本公积",
      "OCI转出",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-dilution-still-equity-method",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "系统补齐",
    "question": "被投资方增资导致持股比例下降但仍采用权益法，原其他综合收益和其他资本公积怎么处理？",
    "summary": "被动稀释后仍用权益法，稀释影响（含内含商誉结转）计入其他资本公积。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "长期股权投资",
      "被投资方增资导致持股比例下降但仍采用权益法",
      "被动稀释",
      "视同部分处置",
      "其他综合收益",
      "资本公积--其他资本公积",
      "Markdown同步"
    ]
  },
  {
    "id": "long-term-equity-investment-disposal-partial-interest-without-loss-control",
    "updatedAt": "2026-09-06",
    "topic": "长期股权投资",
    "difficulty": "高频综合",
    "question": "不丧失控制权处置子公司部分股权，合并底稿如何处理？",
    "summary": "未丧控处置子公司股权为权益交易；按比例把含商誉的归母权益转给少数股东，差额调资本公积。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "journalEntries": [
      {
        "title": "冲回母公司个别报表处置效果",
        "scope": "合并工作底稿",
        "condition": "个别报表已收款P、结转长投成本C并确认收益P−C；下列按P≥C列示，处置损失时投资收益改记贷方",
        "lines": [
          {
            "side": "借",
            "account": "投资收益",
            "amount": "P−C"
          },
          {
            "side": "借",
            "account": "长期股权投资",
            "amount": "C"
          },
          {
            "side": "贷",
            "account": "资本公积——资本溢价或股本溢价",
            "amount": "P"
          }
        ],
        "note": ""
      },
      {
        "title": "出售部分的权益归属调整",
        "scope": "合并工作底稿",
        "condition": "仍控制子公司",
        "lines": [
          {
            "side": "借",
            "account": "资本公积",
            "amount": "出售比例对应净资产份额 + 商誉份额"
          },
          {
            "side": "贷",
            "account": "少数股东权益",
            "amount": "出售比例对应净资产份额 + 商誉份额"
          }
        ],
        "note": ""
      }
    ],
    "tags": [
      "长期股权投资",
      "不丧失控制权",
      "处置子公司部分股权",
      "少数股东权益",
      "资本公积",
      "合并工作底稿",
      "Markdown同步"
    ]
  }
];
