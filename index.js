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
  const path = child.value

  if (!reg.test(path)) {
    ctx.report(child, 'require 参数名称只能以./或者../开头')
  }


  if (reg2.test(path)) {
    ctx.report(child, 'require 参数请去掉js后缀')
  }
}

function removeNullPageCallback (ctx, node) {
  let name = node.key.name
  let body = node.value.body.body

  if (!body.length) {
    ctx.report(node, `PageView子类方法${name}, 不能为空函数，建议删掉`)
  }
}


exports.rules = {
  require: {
    meta: {
      docs: {

      },
      schema: []
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
  },
  'page-null-callback': {
    meta: {
      docs: {

      },
      schema: []
    },
    create: function (ctx) {
      
      return {
        MethodDefinition (node) {
          const methods = ['onCreate', 'onCache', 'onRemove', 'onHide', 'onReachBottom', 'onScroll', 'onShareAppMessage']

          if (methods.includes(node.key.name)) {
            removeNullPageCallback(ctx, node)
            return  
          }

        }
      }

    }
  }
}