// 此文件由专题维护；不要把所有卡片重新合并到单一文件。
export default [
  {
    "id": "accounting-policy-estimate-error-three-types-treatment",
    "updatedAt": "2026-09-07",
    "topic": "会计政策、会计估计及差错更正",
    "difficulty": "系统补齐",
    "question": "政策变更、估计变更与前期差错如何区分和处理？",
    "summary": "先判断改变的是政策、估计还是前期错误，再确定追溯、未来适用及重要性。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "会计政策、会计估计及差错更正",
      "三类事项对应的处理方法",
      "Markdown同步"
    ]
  },
  {
    "id": "accounting-policy-estimate-error-prospective-application-policy-change",
    "updatedAt": "2026-09-07",
    "topic": "会计政策、会计估计及差错更正",
    "difficulty": "系统补齐",
    "question": "追溯不切实可行时，从哪个时点开始处理？",
    "summary": "区分列报前期影响和当期期初累积影响无法确定，并披露无法追溯的原因与处理起点。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "会计政策、会计估计及差错更正",
      "会计政策变更什么时候用未来适用法",
      "Markdown同步"
    ]
  },
  {
    "id": "accounting-policy-estimate-error-policy-change-common-scenarios",
    "updatedAt": "2026-09-07",
    "topic": "会计政策、会计估计及差错更正",
    "difficulty": "系统补齐",
    "question": "哪些属于会计政策变更，哪些只是交易发生了变化？",
    "summary": "同类交易的政策不得随意变更；新交易、交易本质改变及准则规定的重分类另行判断。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "会计政策、会计估计及差错更正",
      "会计政策变更的常见场景",
      "Markdown同步"
    ]
  },
  {
    "id": "accounting-policy-estimate-error-retrospective-adjustment-journal-logic",
    "updatedAt": "2026-09-07",
    "topic": "会计政策、会计估计及差错更正",
    "difficulty": "系统补齐",
    "question": "政策追溯调整与差错重述的分录如何处理？",
    "summary": "政策调整通常直接调整期初项目；重要差错涉及前期损益时经以前年度损益调整，税项须另行判断。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "会计政策、会计估计及差错更正",
      "会计政策变更追溯调整法的分录思路",
      "Markdown同步"
    ],
    "journalEntries": [
      {
        "title": "政策追溯：调增留存收益并新增递延所得税负债",
        "scope": "政策追溯调整",
        "condition": "累积影响归属留存收益，同时新增递延所得税负债；资产、负债科目择用。",
        "body": "借：相关资产（增加）/ 相关负债（减少）\n  贷：递延所得税负债\n      盈余公积\n      利润分配--未分配利润",
        "note": "实际税项可涉及原递延税项转回；10%盈余公积拆分须符合题设及适用规则。"
      },
      {
        "title": "政策追溯：调减留存收益并新增递延所得税资产",
        "scope": "政策追溯调整",
        "condition": "累积影响归属留存收益，同时新增且满足确认条件的递延所得税资产；资产、负债科目择用。",
        "body": "借：盈余公积\n    利润分配--未分配利润\n    递延所得税资产\n  贷：相关资产（减少）/ 相关负债（增加）",
        "note": ""
      }
    ]
  },
  {
    "id": "accounting-policy-estimate-error-retrospective-restatement-template",
    "updatedAt": "2026-09-07",
    "topic": "会计政策、会计估计及差错更正",
    "difficulty": "系统补齐",
    "question": "重要前期差错如何更正收入、费用与税项？",
    "summary": "分别处理错记项目、适用税项和留存收益；纯重分类不经过以前年度损益调整。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "会计政策、会计估计及差错更正",
      "追溯重述法分录模板",
      "Markdown同步"
    ],
    "journalEntries": [
      {
        "title": "补记前期收入",
        "scope": "重要前期差错更正",
        "condition": "以前年度漏记收入；按实际收款权选择应收款或银行存款等。",
        "body": "借：应收账款 / 银行存款等\n  贷：以前年度损益调整",
        "note": "实际税项可涉及原递延税项转回；10%盈余公积拆分须符合题设及适用规则。"
      },
      {
        "title": "补记收入的所得税影响",
        "scope": "重要前期差错更正",
        "condition": "补记收入增加应纳税额或形成递延所得税负债，按实际税项择用；无税务影响时省略。",
        "body": "借：以前年度损益调整\n  贷：应交税费--应交所得税 / 递延所得税负债",
        "note": ""
      },
      {
        "title": "补记收入后结转留存收益",
        "scope": "重要前期差错更正",
        "condition": "补记收入及适用税项后的净影响归属留存收益。",
        "body": "借：以前年度损益调整\n  贷：盈余公积\n      利润分配--未分配利润",
        "note": ""
      },
      {
        "title": "补记前期费用或折旧",
        "scope": "重要前期差错更正",
        "condition": "以前年度漏记费用或折旧；按实际错记项目选择贷方科目。",
        "body": "借：以前年度损益调整\n  贷：累计折旧 / 应付账款 / 其他应付款等",
        "note": ""
      },
      {
        "title": "补记费用的所得税影响",
        "scope": "重要前期差错更正",
        "condition": "补记费用减少应纳税额，或形成满足确认条件的递延所得税资产；无税务影响时省略。",
        "body": "借：应交税费--应交所得税 / 递延所得税资产\n  贷：以前年度损益调整",
        "note": ""
      },
      {
        "title": "补记费用后结转留存收益",
        "scope": "重要前期差错更正",
        "condition": "补记费用及适用税项后的净影响归属留存收益。",
        "body": "借：盈余公积\n    利润分配--未分配利润\n  贷：以前年度损益调整",
        "note": ""
      },
      {
        "title": "不影响损益的应付款重分类",
        "scope": "重要前期差错更正",
        "condition": "误将其他应付款记为应付账款，仅重分类，不影响以前年度损益。",
        "body": "借：应付账款\n  贷：其他应付款",
        "note": ""
      }
    ]
  },
  {
    "id": "accounting-policy-estimate-error-investment-property-cost-to-fair-policy-example",
    "updatedAt": "2026-09-07",
    "topic": "会计政策、会计估计及差错更正",
    "difficulty": "系统补齐",
    "question": "投房成本转公允价值时，累计调整与比较年度调整有何区别？",
    "summary": "期初资产和递延税项看累计影响，比较利润表只调整该年度折旧、公允价值变动和税费。",
    "conclusion": [],
    "reasoning": [],
    "memory": [],
    "pitfalls": [],
    "tags": [
      "会计政策、会计估计及差错更正",
      "投资性房地产成本模式改为公允价值模式例题",
      "Markdown同步"
    ]
  }
];
