/*
parser - Specify the parser to be used (default: espree)

  context.report(node, '');
*/
function lintRequire(ctx, node) {
  let args = node.arguments

  if (args.length !== 1) {
    ctx.report(node, 'require 只能使用一个参数')
  }

  let child = args[0]
  const reg = /^(\.\/|\.\.\/)/
  const reg2 = /\.js$/

  if (!reg.test(child.value)) {
    ctx.report(child, 'require 参数名称只能以./或者../开头')
  }


  if (reg2.test(child.value)) {
    ctx.report(child, 'require 参数请去掉js后缀')
  }
}


exports.rules = {
  "require": {
    meta: {
      docs: {

      },
    },
    create: function(ctx) {
      return {
        CallExpression: function(node) {
          let name = node.callee.name

          switch (name) {
            case 'require':
              lintRequire(ctx, node)
              break
          }
        }
      }
    },
  }
}