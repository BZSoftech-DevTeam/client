import React from 'react'
import GraphsType from './GraphsType'
import LineCharts from './LineCharts'
import AreaCharts from './AreaCharts'
import BarCharts from './BarCharts'

function DemoContainer() {
    return (
        <div className='my-12 h-[99vh] max-w-[80rem] mx-auto space-y-8'>
            <GraphsType></GraphsType>
            <LineCharts></LineCharts>
            <AreaCharts></AreaCharts>
        </div>
    )
}

export default DemoContainer
