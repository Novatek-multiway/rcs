declare namespace MapAPI {
  export interface RootMapObject {
    MapOption: MapOption
    Vertexs: Vertex[]
    Edges: Edge[]
    Carriers: Carrier[]
    CarrierOptions: CarrierOption[]
    Stations: Station[]
    Chassis: Chassi[]
    TrafficCarriers: TrafficCarrier[]
    TrafficBlocks: any[]
  }

  export interface MapOption {
    ID: number
    ProjectName: string
    RouteName: string
    MapCarrier: number
    MapChassis: number
    GUID: string
    Revision: number
    Path: string
    Url: string
    RouteFile: string
    DWGFile: string
    SVGFile: string
    VsfFile: string
    IsActive: boolean
    DWGMinX: number
    DWGMaxX: number
    DWGMinY: number
    DWGMaxY: number
    DWGScale: number
    RouteMinX: number
    RouteMaxX: number
    RouteMinY: number
    RouteMaxY: number
  }

  export interface Vertex {
    ID: number
    Genus: number
    Type: number
    X: number
    Y: number
    Inputs?: number[]
    Outputs?: number[]
    Tier: any[]
    Floor: number
    Z: number
    Graphs: any[]
    Stand: number
    IsSplitPoint: number
    NoCall: number
    IsLoadAvailable: boolean
    PalletDirection: number
    Row: number
    Col: number
    Layer: number
    AssistPoint: number
  }

  export interface Edge {
    ID: number
    DirectionType: number
    Genus: number
    Type: number
    Direction: number
    HeadingAngle: number
    EnterAngle: number
    LeaveAngle: number
    Start: number
    End: number
    Floor: number
    IsVirtual: boolean
    Graphs: any[]
    SpeedRatio: number
    Length: number
    ManualWeight: number
    UsedWeight: number
    SplineKey: number
    Weight: number
    VariableBits: number
    IsHoldFork: boolean
    IsLoadAvailable: boolean
    ControlPoint: ControlPoint[]
    PalletDirection: number
    IsCloseObstacle: boolean
  }

  export interface ControlPoint {
    ID: number
    EdgeID: number
    Order: number
    X: number
    Y: number
  }

  export interface Carrier {
    ID: number
    Heart: number
    X: number
    Y: number
    IsLockdown: boolean
    Z: number
    Angle: number
    Speed: number
    ElecQuantity: number
    EnergyState: number
    ControlState: number
    EmergencyStatus: number
    IsInSystem: boolean
    ForkReach: number
    ForkHeight: number
    GoodsStatus: number
    RouteType: number
    RouteKey: number
    RounteCompeleteRate: number
    IsSimulation: boolean
    IsTrafficOnline: boolean
    DeviceState: number
    AbnormalState: number
    GroupGuid: string
    TaskGuid: string
    JobId: number
    CmdId: number
    TaskStatus: number
    ReceiveSerial: number
    ChargeStatus: number
    SkyVisionCheck: number
    SchedulingStatus: number
    TrafficControlCar: number
    BarCode: string
    Token: string
    IsFloat: boolean
    LasFullDate: string
    AvailableState: number
    LastChargeDate: any
    Free: boolean
  }

  export interface CarrierOption {
    ID: number
    Name: string
    Type: number
    IP: string
    ChassisID: number
    IsActive: boolean
    IsSimulation: boolean
    LoadOffsetX: number
    LoadOffsetY: number
    LoadWidth: number
    LoadLength: number
    LoadRadius: number
    LoadSpeed: number
    Acc: number
    Dec: number
    IsAutoReHome: boolean
    ReHomeWaitTime: number
    HomePoint: number
  }

  export interface Station {
    ID: number
    Genus: number
    PointKey: number
    Layer: number
    ForkHight: number
    ForkLow: number
    Carrier: number
    CarrierType: number
    Group: number
    Number: number
    Priority: number
    Type: number
    State: number
    UsageCount: number
    Name: string
    DisplayName: string
    DisplayFontColor: string
    DisPlayWidth: number
    DisPlayLength: number
    DisPlayHeight: number
    BackGroundColor: string
    WorkAreaTypeStr: string
    Angle: number
    DisPlayModel: string
    HomeGroup: number
    HomeGroupType: number
    HomeGroupPriority: number
  }

  export interface Chassi {
    ID: number
    Type: number
    Model: string
    Length: number
    Width: number
    SafeX: number
    SafeY: number
    SpeedMax: number
    ForcedCharge: number
    BrakingAcceleration: number
    TimeOut: number
    Shutdown: number
    FreeSecond: number
    FullChargeDay: number
    IsControlFront: boolean
    NoLoadOffsetX: number
    NoLoadOffsetY: number
    NoLoadWidth: number
    NoLoadLength: number
    NoLoadRadius: number
    NoLoadSpeed: number
    MaxAcc: number
    MaxDec: number
    ChassisModel: string
  }

  export interface TrafficCarrier {
    Locker: Locker
    AvoidPath: AvoidPath
    ID: number
    IsActive: boolean
    BlockCarrier: number
    BlockType: number
    TaskID: number
    TargetPoint: number
    LastTaskCompTime: string
    Priority: number
    WaitPriority: number
    DeliverPriority: number
    Graphs: Graph[]
    NextGraphs: any[]
    BaseIndex: number
    CurrentIndex: number
    Action: number
    LockStartIndex: number
    LockEndIndex: number
    MaxSpeed: number
    ChassisID: number
    NoLoadOffsetX: number
    NoLoadOffsetY: number
    NoLoadWidth: number
    NoLoadLength: number
    LoadOffsetX: number
    LoadOffsetY: number
    LoadWidth: number
    LoadLength: number
    SafeLength: number
    SafeWidth: number
    SafeMove: number
    GoodsState: number
    BlockVertexGuid: string
    BranchIndex: number
    DeadLockString: string
    DeadLockBlockCarrier: number
    IsDeadLock: boolean
    IsGreedyDetection: boolean
    IsCrossAtEnd: boolean
  }

  export interface Locker {
    IsReadLockHeld: boolean
    IsUpgradeableReadLockHeld: boolean
    IsWriteLockHeld: boolean
    RecursionPolicy: number
    CurrentReadCount: number
    RecursiveReadCount: number
    RecursiveUpgradeCount: number
    RecursiveWriteCount: number
    WaitingReadCount: number
    WaitingUpgradeCount: number
    WaitingWriteCount: number
  }

  export interface AvoidPath {
    ThisGuid: string
    BlockCarrier: number
    AvoidCarrier: number
    Steps: Steps
  }

  export interface Steps {
    VertexID: number
    Cost: number
    PathIn: any
    PathOut: any
  }

  export interface Graph {
    ID: number
    Genus: number
    Direction: number
    IsRotating: boolean
    StartAngle: number
    EndAngle: number
    LastAngle: number
    Order: number
    PalletDirection: number
    IsLoad: boolean
    VariableBits: number
    Floor: number
  }
}

declare namespace ReportAPI {
  // 在线车辆
  interface OnlineCarrier {
    id: number
    agvNo: number
    x: number
    y: number
    angle: number
    isWork: boolean
    isError: boolean
    isOnline: boolean
    type: string
    image: string
    lkX1: number
    lkX2: number
    lkY1: number
    lkY2: number
    profileHeightScale: number
    profileWidthScale: number
    plannings: Planning[]
    currentCmd: number
    availableState: number
    errorCode: number
    elecQuantity: number
    statusName: string
    goodsStatus: number
    controlState: number
  }

  interface Planning {
    planningType: number //
    planningKey: number
    state1: number // 0-已规划  6-已分配 7-交管确认 3-已下发  4-行驶中 1-事件失败  2-被交管  5-已路过
  }
}
