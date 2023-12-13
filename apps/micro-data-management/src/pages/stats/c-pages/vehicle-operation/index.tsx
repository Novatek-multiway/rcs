import {
  getAgvCharge,
  getAgvEfficiency,
  getAgvKilometers,
  getAgvThroughReport,
  getAgvTimeRatio,
  getEquipmentTaskReport,
  getNoFaultReport
} from 'apis'
import { ICarrierReportParams } from 'apis/modules/report/type'
import { IResponse } from 'apis/type'
import dayjs from 'dayjs'
import type { FC, ReactNode } from 'react'
import React, { memo, useCallback, useEffect, useState } from 'react'

import Efficiency from './components/efficiency'
import ElapsedTimeRatio from './components/elapsedTimeRatio'
import Electricity from './components/electricity'
import FinishedTasks from './components/finishedTasks'
import Mileage from './components/mileage'
import NoFaultTime from './components/noFaultTime'
import SearchArea, { ISearchAreaProps } from './components/searchArea'
import UtilizationRate from './components/utilizationRate'
import { VehicleOperationWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const VehicleOperation: FC<IProps> = () => {
  const [searchFormData, setSearchFormData] = useState<ISearchAreaProps['formData']>({
    startDate: dayjs().startOf('month'),
    endDate: dayjs().endOf('month'),
    carrierID: '全部'
  })

  const [electricityData, setElectricityData] = useState<ReportAPI.Electricity>() //电量统计数据
  const [efficiencyData, setEfficiencyData] = useState<ReportAPI.Efficiency>() //效率统计数据
  const [elapsedTimeRatioData, setElapsedTimeRatioData] = useState<ReportAPI.TimeRatio>() // 车辆运行时间占比数据
  const [utilizationRateData, setUtilizationRateData] = useState<ReportAPI.UtilizationRate>() // 稼动率
  const [noFaultTimeData, setNoFaultTimeData] = useState<ReportAPI.NoFaultTime>() // 无故障时间统计
  const [finishedTasksData, setFinishedTasksData] = useState<ReportAPI.FinishedTasks>() // 无故障时间统计
  const [mileageData, setMileageData] = useState<ReportAPI.Mileage>() // 无故障时间统计

  const handleSearch = useCallback<NonNullable<ISearchAreaProps['onSearch']>>(() => {
    const timeDiff = searchFormData.endDate?.diff(searchFormData.startDate, 'day')
    const isOneDay = timeDiff === 0
    const format = isOneDay ? '' : 'YYYY-MM-DD'
    const data: ICarrierReportParams = {
      startTime: searchFormData.startDate!.format(format),
      endTime: searchFormData.endDate!.format(format),
      type: isOneDay ? 0 : 1
    }
    if (searchFormData.carrierID !== '全部') data['carrierID'] = searchFormData.carrierID

    const promisesWithHandle: [Promise<IResponse<any>>, React.Dispatch<React.SetStateAction<any | undefined>>][] = [
      [getAgvCharge(data), setElectricityData],
      [getAgvEfficiency(data), setEfficiencyData],
      [getAgvTimeRatio(data), setElapsedTimeRatioData],
      [getAgvThroughReport(data), setUtilizationRateData],
      [getNoFaultReport(data), setNoFaultTimeData],
      [getEquipmentTaskReport(data), setFinishedTasksData],
      [getAgvKilometers(data), setMileageData]
    ]
    Promise.all(promisesWithHandle.map(([promise]) => promise)).then((resultList) =>
      promisesWithHandle.map(([, handle], index) => handle(resultList[index].data))
    )
  }, [searchFormData])

  useEffect(() => {
    handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <VehicleOperationWrapper>
      <SearchArea formData={searchFormData} onChange={setSearchFormData} onSearch={handleSearch} />
      <div className="content">
        <div className="header">
          <div style={{ width: '25%' }}>
            <Electricity
              count={electricityData?.dayCount}
              totalCount={electricityData?.grandTotal}
              labels={electricityData?.labels || []}
              values={electricityData?.values || []}
            />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <Efficiency
              useRatio={efficiencyData?.useRatio || 0}
              troubleprool={efficiencyData?.troubleprool}
              trafficControl={efficiencyData?.trafficControl}
            />
          </div>

          <div style={{ width: '25%' }}>
            <ElapsedTimeRatio
              workTime={elapsedTimeRatioData?.workTime}
              freeTime={elapsedTimeRatioData?.freeTime}
              trafficTime={elapsedTimeRatioData?.trafficTime}
              chargeTime={elapsedTimeRatioData?.chargeTime}
            />
          </div>
        </div>
        <div className="footer">
          <div style={{ flex: 1, minWidth: 0 }}>
            <UtilizationRate labels={utilizationRateData?.labels} values={utilizationRateData?.values} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <NoFaultTime labels={noFaultTimeData?.labels} values={noFaultTimeData?.values} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <FinishedTasks labels={finishedTasksData?.labels} values={finishedTasksData?.values} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Mileage labels={mileageData?.labels} values={mileageData?.values} />
          </div>
        </div>
      </div>
    </VehicleOperationWrapper>
  )
}

export default memo(VehicleOperation)
