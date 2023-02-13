import './Node.css'

import React, {useState} from 'react'

function Node() {
    const default_node_list = new Map([
        ['5-5', {x: 5, y: 5, title: 'テーマ', isActive: true}],
    ])

    const [node_list, setNodeList] = useState(default_node_list)
    const [isExistNode, setIsExistNode] = useState(new Set(default_node_list.keys()))

    function activateNode(key: string) {
        let node = node_list.get(key)
        if (node) {
            node.isActive = true
            setNodeList(node_list)
        }
        expandNode(key)
    }

    function expandNode(key: string) {
        let dir: number[][] = [[0, 1], [1, 0], [0, -1], [-1, 0]]
        let newTitles: string[] = ['なぜ？', '同じような事例', 'ということは？', '過去は？']
        let newNodeList = new Map()
        let tmp_node = node_list.get(key)
        
        let x = tmp_node?.x ? tmp_node.x : 0
        let y = tmp_node?.y ? tmp_node.y : 0

        if (x === 0 || y === 0) {
            console.log('エラー発生');
        }

        for (let i = 0; i < dir.length; i++) {
            let xx = x + dir[i][0]
            let yy = y + dir[i][1]

            if (x > 0 && y > 0 && !isExistNode.has(`${xx}-${yy}`)) {
                newNodeList.set(`${xx}-${yy}`, {x: xx, y: yy, title: newTitles[i], isActive: false})
                setIsExistNode(isExistNode.add(`${xx}-${yy}`))
            }
        }
        setNodeList(new Map([...node_list, ...newNodeList]))
    }

    return (
        <div className="wrapper">
            {[...node_list].map(([key, value]) => <div
                className={`node ${value.isActive ? 'node-active' : 'node-inactive'}`}
                onMouseDown={() => (activateNode(key))}
                key={key}
                style={{gridColumn: value.x, gridRow: value.y}}
                contentEditable={true} suppressContentEditableWarning={true}
            >{value.title}</div>)
            }
        </div>)
}

export default Node