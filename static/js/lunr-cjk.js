// CJK 分词补丁：lunr 默认按空白切词、且 trimmer 用 \W 裁剪 token。
// 这两点对中文都是灾难：整句变成单个 token 且被 trimmer 整段剥掉，索引里不会存在任何中文词。
// 本补丁：1) 将连续 CJK 文本切成二元词组（bigram），索引与查询走同一路径；
//         2) 用 Unicode 感知的 trimmer 替换默认实现，保留中日韩字符。
// 注意：必须以 defer 顺序加载在 lunr.js 之后、main.js（构建索引）之前。
(function () {
  if (!window.lunr || window.lunr.__cjkPatched) return;
  window.lunr.__cjkPatched = true;

  var orig = lunr.tokenizer;
  var toBigrams = function (s) {
    return String(s).replace(/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]+/g, function (m) {
      if (m.length === 1) return m;
      var out = [];
      for (var i = 0; i < m.length - 1; i++) out.push(m.slice(i, i + 2));
      return out.join(' ');
    });
  };
  lunr.tokenizer = function (obj) {
    if (obj == null) return [];
    if (Array.isArray(obj)) {
      return obj.reduce(function (acc, t) { return acc.concat(lunr.tokenizer(t)); }, []);
    }
    return orig(toBigrams(obj));
  };
  // 原实现的切分规则挂在函数属性上（lunr.tokenizer.separator），替换函数后必须带回。
  lunr.tokenizer.separator = orig.separator;

  // 默认 trimmer 以 \W 裁首尾，而 JS 的 \W 不含 CJK，中文 token 会被整段剥成空串。
  // 换成 Unicode 字母/数字感知版本：保留所有语言文字，只裁首尾标点空白。
  lunr.trimmer = function (token) {
    return token.update(function (s) {
      return s.replace(/^[^\p{L}\p{N}]+/u, '').replace(/[^\p{L}\p{N}]+$/u, '');
    });
  };
  lunr.trimmer.label = 'trimmer';
})();
