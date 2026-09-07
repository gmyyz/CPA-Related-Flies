// 正文在章节笔记维护；此处保存对应卡片摘要与结构化分录。
export default {
  "financial-instruments-01": {
    "summary": "按合同权利义务识别工具，再处理分类、计量、减值、转移与套期；各专题规则按本章目录查阅。"
  },
  "financial-instruments-02": {
    "summary": "债务工具结合业务模式与SPPI分类；非交易性权益工具可初始指定FVOCI，符合条件还可指定FVTPL。"
  },
  "financial-instruments-03": {
    "summary": "金融资产包括现金、其他方权益工具及合同收款或交换权利；涉及自身股票时区分非衍生与衍生合同。"
  },
  "financial-instruments-04": {
    "summary": "先识别合同支付义务，再核对专门准则范围；职工薪酬、预收货款和保修义务不能一概套用金融工具准则。"
  },
  "financial-instruments-05": {
    "summary": "发行方按合同义务及自身股票结算条件区分负债与权益；固定换固定的权益期权后续不重估。",
    "journalEntries": [
      {
        "title": "发行看涨期权",
        "scope": "固定换固定权益工具",
        "condition": "2X25 年 1 月 1 日收到期权费",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "90"
          },
          {
            "side": "贷",
            "account": "其他权益工具",
            "amount": "90"
          }
        ],
        "note": "分类为权益工具，后续不确认公允价值变动损益。"
      },
      {
        "title": "期权行权发行普通股",
        "scope": "固定换固定权益工具",
        "condition": "2X25 年 12 月 31 日乙公司行权",
        "lines": [
          {
            "side": "借",
            "account": "银行存款",
            "amount": "300"
          },
          {
            "side": "借",
            "account": "其他权益工具",
            "amount": "90"
          },
          {
            "side": "贷",
            "account": "股本",
            "amount": "10"
          },
          {
            "side": "贷",
            "account": "资本公积--股本溢价",
            "amount": "380"
          }
        ],
        "note": "资本公积 = 期权费 90 + 行权款 300 - 股本 10。"
      }
    ]
  },
  "financial-instruments-06": {
    "summary": "永续债结合到期、清偿、票息和间接义务判断；工具名称与利率封顶均不能单独决定权益分类。"
  },
  "financial-instruments-07": {
    "summary": "附回购义务增资须识别负债；固定回报与股价挂钩分别判断计量，约定回购金额不自动等于公允价值。"
  },
  "financial-instruments-08": {
    "summary": "少数股东看跌期权区分母公司、子公司个别报表及合并报表；期权公允价值与回购义务现值不能混用。"
  },
  "financial-instruments-09": {
    "summary": "复合工具先计负债、余款计权益，发行费用按成分分摊；利息及资本化以负债实际利率等条件计算。"
  },
  "financial-instruments-10": {
    "summary": "SPPI审查基本借贷补偿及合同条款；或有事项、加点和倍数须按现金流实质判断。"
  },
  "financial-instruments-11": {
    "summary": "应收款项融资是列报项目，不能当作第四类金融资产；先定计量类别，再定报表项目。"
  },
  "financial-instruments-12": {
    "summary": "基金及合伙份额须判断是否属于可指定的权益投资；发行方按特殊例外列权益不等于持有方可指定FVOCI。"
  },
  "financial-instruments-13": {
    "summary": "金融资产主合同整体分类；其他混合合同按嵌入衍生工具的分拆条件判断，不能见到挂钩条款就拆分。"
  },
  "financial-instruments-14": {
    "summary": "成为合同一方时确认，满足条件才终止确认；常规交易及电子支付提前终止确认有专门规则。"
  },
  "financial-instruments-15": {
    "summary": "债权投资按实际利率计息；一般计息、信用减值、POCI及未终止确认的合同修改分别处理。"
  },
  "financial-instruments-16": {
    "summary": "权益FVOCI处置差额和累计OCI转留存；相关当期税项与递延税项均跟随权益交易，例题区分税前税后。"
  },
  "financial-instruments-17": {
    "summary": "其他债权投资以公允价值列示，实际利率计息与减值单独核算；处置时累计OCI转损益。"
  },
  "financial-instruments-18": {
    "summary": "指定FVTPL负债的自身信用变动通常计入OCI；损益错配、财务担保及贷款承诺存在例外。"
  },
  "financial-instruments-19": {
    "summary": "一般ECL按信用风险变化分三阶段；12个月ECL不是只算12个月内损失，简化处理须符合适用范围。"
  },
  "financial-instruments-20": {
    "summary": "自身工具因合同条件变化符合重分类要求时，权益转负债按公允价值、负债转权益按账面价值处理。"
  },
  "financial-instruments-21": {
    "summary": "金融资产业务模式实际改变才重分类；六类转换分别处理公允价值差额、OCI、利率及减值准备。"
  },
  "financial-instruments-22": {
    "summary": "金融资产转移先判断风险报酬，再判断控制；部分担保不自动意味着继续涉入或可终止确认。"
  },
  "financial-instruments-23": {
    "summary": "公允价值套期下，确定承诺履约时将其累计套期调整计入初始资产或负债，避免重复确认。"
  },
  "financial-instruments-24": {
    "summary": "现金流量套期有效部分先入储备；后续按所形成项目转损益或调整非金融项目成本，终止时另判预期发生。"
  },
  "financial-instruments-25": {
    "summary": "公允价值套期调整指定风险产生的变动；存货从原账面价值起调，权益FVOCI的套期存在OCI例外。",
    "journalEntries": [
      {
        "title": "被套期存货公允价值下降",
        "scope": "公允价值套期",
        "condition": "被套期项目因被套期风险形成损失",
        "lines": [
          {
            "side": "借",
            "account": "套期损益",
            "amount": "20"
          },
          {
            "side": "贷",
            "account": "被套期项目——存货",
            "amount": "20"
          }
        ],
        "note": "调的是套期期间风险变动额，不是调到套期开始日公允价值。"
      },
      {
        "title": "套期工具公允价值上涨",
        "scope": "公允价值套期",
        "condition": "铜期货合同公允价值上涨",
        "lines": [
          {
            "side": "借",
            "account": "套期工具",
            "amount": "20"
          },
          {
            "side": "贷",
            "account": "套期损益",
            "amount": "20"
          }
        ],
        "note": "有效套期下，两边套期损益方向相反。"
      }
    ]
  },
  "financial-instruments-26": {
    "summary": "其他债权投资分别算账面余额、扣减准备后的摊余成本与公允价值；利息基础取决于信用减值状态。"
  },
  "financial-instruments-27": {
    "summary": "负债工具的利息按适用计量规则及资本化条件处理；权益工具分配冲权益，名称不决定会计处理。"
  },
  "financial-instruments-28": {
    "summary": "可转债权益成分的科目余额与权益净增加额并非同一指标；发行费用分摊后核对总额。"
  },
  "financial-instruments-29": {
    "summary": "外汇风险可影响公允价值或未来现金流；确定承诺外汇风险可选择套期类型，须正式指定且满足条件。"
  },
  "financial-instruments-30": {
    "summary": "保险合同先判断重大保险风险；担保、固定收费服务、死亡豁免及相机分红投资合同分别核对适用条件。"
  }
};
