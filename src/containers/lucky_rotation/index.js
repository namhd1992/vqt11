import React from 'react'
import { bindActionCreators } from 'redux'
import Pagination from "react-js-pagination";
import { connect } from 'react-redux'
import './css/style.css';
import {
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn,
	getTuDo,
	getHistoryTuDo,
	getCodeBonus,
	getVinhDanh,
} from '../../modules/lucky'
import Wheel from './Winwheel'
import {
	getData
} from '../../modules/profile'

import arrow_down from './images/arrow-down.png'
import backtotop from './images/backtotop.png'
import banner_slider_1 from './images/banner-slider-1.png'
import bg_acc from './images/bg-acc.png'
import bg_bang_vinh_danh from './images/bg-bang-vinh-danh.png'
import bg_cloud from './images/bg-cloud.png';
// import bg_float_left from './images/bg-float-left.gif';
import bg_float_right from './images/bg-float-right.png';
import bg_footer from './images/bg-footer.png';
import bg_header from './images/bg-header.png';
import bg_popup_giaithuong from './images/bg-popup-giaithuong.png';
import bg_step from './images/bg-step.png';
import bg_the_le from './images/bg-the-le.png';
import bg_the_le_mobile from './images/bg-the-le-mobile.png';
import bg_time from './images/bg-time.png';
import btn_hotline_hotro from './images/btn-hotline-hotro.png';
import btn_huong_dan_mua_the from './images/btn-huong-dan-mua-the.png';
import btn_mo_tu_dong from './images/btn-mo-tu-dong.png';
import btn_mo_x1 from './images/btn-mo-x1.png';
import btn_mua_chia_khoa from './images/btn-mua-chia-khoa.png';
import btn_nap_game from './images/btn-nap-game.png';
import btn_nap_scoin from './images/btn-nap-scoin.png';
import btn_nhan_tb_sk from './images/btn-nhan-tb-sk.png';
import btn_them_luot from './images/btn-them-luot.png';
import btn_xac_nhan_mua from './images/btn-xac-nhan-mua.png';
import close_icon from './images/close-icon.png';
import header_bang_vinh_danh from './images/header-bang-vinh-danh.png';
import header_giaithuong from './images/header-giaithuong.png';
import icon_noti from './images/icon-noti.png';
import img_step1 from './images/img-step1.png';
import img_step2 from './images/img-step2.png';
import img_step3 from './images/img-step3.png';
import key_brown_icon from './images/key-brown-icon.png';
import key_icon from './images/key-icon.png';
import key_yellow_icon from './images/key-yellow-icon.png';
import logo from './images/logo.png';
import logo_scoin from './images/logo-scoin.png';
import logo_splay from './images/logo-splay.png';
import logo_vtcmobile from './images/logo-vtcmobile.png';
import next_icon from './images/next-icon.png';
import prev_icon from './images/prev-icon.png';
import ruong_icon from './images/ruong-icon.png';
// import img_thongbao from './images/img-thongbao.png';

import ReactResizeDetector from 'react-resize-detector'
// import spin from './images/spin.gif';
import $ from 'jquery';
import 'bootstrap';

import data from './data'
const styles = {
	paper: {
		background: "#fff",
	},
};

class Lucky_Rotation extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			limit: 10,
			offsetTuDo: 0,
			offsetCode: 0,
			offsetVinhDanh: 0,
			numberShow:15,
			isAll:true,
			wheelPower:0,
			wheelSpinning:false,
			stop:true,
			auto: false,
			userTurnSpin:{},
			itemOfSpin:[],
			luckySpin:{},
			userTurnSpin:{},
			turnsFree:0,
			isLogin:false,
			day:'00',
			hour:'00', 
			minute:'00', 
			second:'00',
			itemBonus:{},
			activeCodeBonus:1,
			activeVinhDanh:1,
			activeTuDo:1,
			activeHistory:1,
			countVinhDanh:0,
			countHistory:0,
			countTuDo:0,
			countCodeBonus:0,
			dataVinhDanh:[],
			dataTuDo:[],
			dataCodeBonus:[],
			listVinhDanh:[],
			listTuDo:[],
			listHistory:[],
			listCodeBonus:[],
			width:0,
			height:0,
			img_width:0,
			img_height:0,
			code:false,
			scoinCard:false,
			inputValue: '',
			noti_mdt:false,
			noti_tudo:false,
			numberPage:3,
			message_status:'',
			data_auto:[],
			isSpin:false,
			closeAuto:true,
			message_error:'',
			server_err:false,
			finished:false,
			user:{},
			xacthuc:false,
			status_sukien:'Sự kiện đang diễn ra còn',
			turnsBuyInfo:[],
		};
	}
	componentWillMount(){
		this.onResize()
		window.removeEventListener('scroll', this.handleScroll);
	}



	componentDidMount(){
		const {img_width, img_height}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getRotationDetailDataUser(user.access_token, 119).then(()=>{
				var data=this.props.dataRotationWithUser;
				if(data!==undefined){
					if(data.status==='01'){
						this.getStatus(data.data.luckySpin);
						this.setState({userTurnSpin:data.data.userTurnSpin, user:user, itemOfSpin:data.data.itemOfSpin, luckySpin:data.data.luckySpin, turnsFree:(data.data.userTurnSpin.turnsFree+data.data.userTurnSpin.turnsBuy), turnsBuyInfo:data.data.userTurnSpin.turnsBuyInfo, isLogin:true})
					}else{
						// $('#myModal11').modal('show');
						this.setState({message_error:'Không lấy được dữ liệu người dùng. Vui lòng tải lại trang.'})
					}
				}else{
					// $('#myModal12').modal('show');
					this.setState({server_err:true})
				}
				
			});
		} else {
			this.props.getRotationDetailData(119).then(()=>{
				var data=this.props.dataRotation;
				if(data!==undefined){
					if(data.status==='01'){
						this.getStatus(data.data.luckySpin);
						this.setState({userTurnSpin:data.data.userTurnSpin, itemOfSpin:data.data.itemOfSpin, luckySpin:data.data.luckySpin, turnsFree:(data.data.userTurnSpin.turnsFree+data.data.userTurnSpin.turnsBuy), isLogin:false})
					}else{
						// $('#myModal11').modal('show');
						this.setState({message_error:'Không lấy được dữ liệu.  Vui lòng tải lại trang.'})
					}
				}else{
					// $('#myModal12').modal('show');
					this.setState({server_err:true})
				}
			});
		}
		this.getVinhDanh(1);
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
		this.setState({ auto : !this.state.auto});
	}

	onResize=()=>{
		if (window.innerWidth <= 320) {
			this.setState({ width: 210, height: 235, img_width:170, img_height:170});
		}
		if (window.innerWidth > 320 && window.innerWidth <= 480) {
			this.setState({ width: 250, height: 280, img_width:200, img_height:200});
		}
		if (window.innerWidth > 480 && window.innerWidth <= 600) {
			this.setState({ width: 335, height: 375, img_width:270, img_height:270});
		}
		if (window.innerWidth > 600 && window.innerWidth <= 768) {
			this.setState({ width: 470, height: 525, img_width:375, img_height:375});
		}
		if (window.innerWidth > 768 && window.innerWidth < 1024) {
			this.setState({ width: 504, height: 563, img_width:405, img_height:405});
		}
		if (window.innerWidth >= 1024) {
			this.setState({ width: 670, height: 752, img_width:540, img_height:540});
		}
	}

	getVinhDanh=(pageNumber)=>{
		const {limit}=this.state;
		this.props.getVinhDanh(119, limit, (pageNumber-1)).then(()=>{
			var data=this.props.dataVinhDanh;
			if(data!==undefined){
				if(data.status==='01'){	
					this.setState({listVinhDanh:data.data, countVinhDanh:data.totalRecords})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Không lấy được dữ liệu bảng vinh danh.'})
				}
			}else{
				// $('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	getStatus=(luckySpin)=>{
		console.log(luckySpin)
		var start=luckySpin.startDate;
		var end=luckySpin.endDate;
		var time=Date.now();

		if (time < start) {
			this.timeRemain(start)
			this.setState({ status_sukien: 'Sự kiện chưa diễn ra.', message_status:"Sự kiện chưa diễn ra."});
		}
		if (time > start && time < end) {
			this.timeRemain(end)
			this.setState({ status_sukien: "Sự kiện đang diễn ra còn"});
		}
		if (time > end) {
			this.setState({ status_sukien: "Sự kiện đã kết thúc.", message_status:"Sự kiện đã kết thúc."});
			$('#myModal14').modal('show');
			
		}
	}

	handleScroll = (event) => {
		if (document.body.getBoundingClientRect().top < -300){
			$("#button").show();
		}else{
			$("#button").hide();
		}
	}

	loginAction = () => {
		const {server_err}=this.state;
		// if(!server_err){
			if (typeof(Storage) !== "undefined") {
				var currentPath = window.location.pathname;
				localStorage.setItem("currentPath", currentPath);
			} else {
				console.log("Trình duyệt không hỗ trợ localStorage");
			}
			// window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=58306439627cac03c8e4259a87e2e1ca&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)
			window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
		// }else{
		// 	$('#myModal12').modal('show');
		// }
	}
	logoutAction = () => {
		localStorage.removeItem("user");
		// window.location.replace(
		// 	`https://graph.vtcmobile.vn/oauth/authorize?client_id=58306439627cac03c8e4259a87e2e1ca&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		// );

		window.location.replace(
			`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		);
	}

	start=()=>{
		const {turnsFree, itemOfSpin, luckySpin, isSpin, closeAuto, finished}=this.state;
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var time=Date.now();
		if(time > luckySpin.endDate){
			this.setState({message_status:"Vòng quay đã kết thúc."},()=>{
				$('#myModal8').modal('show');
			})
		}else{
			if (user !== null) {
				if(!finished){
					if(turnsFree>0){
						this.props.pickCard(user.access_token, luckySpin.id).then(()=>{
							var data=_this.props.dataPick;
							var list=this.state.data_auto;
							if(data!==undefined){
								if(data.status ==="01"){
									if(data.data.item.type==="LUCKY_NUMBER"){
										this.setState({code:true})
										setTimeout(()=>{
											this.setState({noti_mdt:true})
										},2000)
									}else{
										if(data.data.item.type!=="ACTION"){
											setTimeout(()=>{
												this.setState({noti_tudo:true})
											},2000)
											this.getVinhDanh(1);	
										}
										if(data.data.item.type==="SCOIN_CARD"){
											this.setState({scoinCard:true})
										}
										this.setState({code:false})
										
									}
									list.push(data.data.item.name);
									var pos=1;
									if(data.data.item.type==="SCOIN"){
										pos=9;
									}else{
										var id=_this.props.dataPick.data.id;
										pos = itemOfSpin.map(function(e) { return e.id; }).indexOf(id);
									}
									
									this.resetWheel();
									if(!isSpin && closeAuto){
										this.startSpin(pos+1);
									}	
									_this.setState({itemBonus: data.data.item, data_auto: list, closeAuto:true});
								}else if(data.status ==="04"){
									$('#myModal13').modal('show');
								}else if(data.status ==="07"){
										this.setState({message_status:"Sự kiện chưa diễn ra hoặc đã kết thúc."},()=>{
										$('#myModal8').modal('show');
									})
								}else if(data.status ==="10"){
									this.setState({message_status:"Bạn cần xác nhận số ĐT để chơi.", xacthuc:true},()=>{
										$('#myModal8').modal('show');
									})
								}else{
									$('#myModal11').modal('show');
									this.setState({message_error:'Vòng quay đang có lỗi. Vui lòng tải lại trang.'})
								}
							}else{
								$('#myModal12').modal('show');
								this.setState({server_err:true})
							}
						})
						
					}else{
						$('#myModal6').modal('show');
					}
				}else{
					$('#myModal13').modal('show');
				}
			} else {
				$('#myModal5').modal('show');
			}
		}
		
	}

	btnStart=()=>{
		const {wheelSpinning}=this.state;
		if(!wheelSpinning){
			this.setState({data_auto:[], closeAuto:true},()=>{
				this.start();
			})
		}	
	}

	startSpin=(segmentNumber)=>{

	}
	

	completeRotation=()=>{
		const {auto, turnsFree, itemBonus}=this.state;
		if(auto){
			var intervalId = setInterval(this.autoRotation, 2000);
			$('#myModal9').modal('show');
   			this.setState({intervalId: intervalId, isSpin: true, closeAuto:false, wheelSpinning: false});
			
		}else{
			if(itemBonus.type!=="ACTION"){
				$('#myModal4').modal('show');
			}
			this.setState({isSpin: false, closeAuto:true, wheelSpinning: false});
			this.getDetailData()
		}
	}

	handleChange = () => {
		this.setState({ auto : !this.state.auto});
	};


	autoRotation=()=>{
		const {turnsFree, luckySpin}=this.state;
		if(turnsFree>0){
			this.getDetailData();
		}else{
			clearInterval(this.state.intervalId);
		}
	}


	getDetailData=()=>{
		const {auto}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.getRotationDetailDataUser(user.access_token, 119).then(()=>{
			var data=this.props.dataRotationWithUser;
			if(data!==undefined){
				var turnsFree=data.data.userTurnSpin.turnsFree+data.data.userTurnSpin.turnsBuy;
				if(data.status==='01'){
					if(turnsFree>0){
						if(auto){
							this.start();
						}
					}else{
						$('#myModal6').modal('show');
						clearInterval(this.state.intervalId);
					}
					this.setState({turnsFree:turnsFree})
				}else if(data.status ==="04"){
					$('#myModal13').modal('show');
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Lỗi hệ thống. Vui lòng thử lại.'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	// showPopup=()=>{
	// 	const {itemBonus, turnsFree}=this.state;

	// 	setTimeout(()=>{
	// 		$('#myModal4').modal('hide');
	// 		if(turnsFree>0){
	// 			this.start()
	// 		}
	// 	},2000)
	// 	if(itemBonus.keyName!=="matluot"){
	// 		$('#myModal4').modal('show');
	// 	}
	// }

	timeRemain=(times)=>{
		var _this=this;
		setInterval(()=>{
			var time=(times-Date.now())/1000;
			if(time>0){
				var day=Math.floor(time/86400) > 9 ? Math.floor(time/86400) : `0${Math.floor(time/86400)}`;
				var hour=Math.floor((time%86400)/3600) > 9 ? Math.floor((time%86400)/3600) : `0${Math.floor((time%86400)/3600)}`;
				var minute=Math.floor(((time%86400)%3600)/60) > 9 ? Math.floor(((time%86400)%3600)/60) : `0${Math.floor(((time%86400)%3600)/60)}`;
				var second=Math.ceil(((time%86400)%3600)%60) > 9 ? Math.ceil(((time%86400)%3600)%60) : `0${Math.ceil(((time%86400)%3600)%60)}`;
				_this.setState({day:day, hour: hour, minute: minute, second:second})
			}
		}, 1000);
	}


	showModalBonus=()=>{
		$('#myModal').modal('show'); 
	}

	hideModalBonus=()=>{
		$('#myModal').modal('hide');
	}

	showModalRules=()=>{
		$('#myModal1').modal('show'); 
	}

	hideModalRules=()=>{
		$('#myModal1').modal('hide');
	}

	showModalTuDo=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.getDataTuDo(user);
			$('#myModal4').modal('hide');
			$('#myModal2').modal('show');
		}else {
			$('#myModal5').modal('show');
		}
	}

	getDataTuDo=(user)=>{
		const {luckySpin, limit, activeTuDo}=this.state;
		// var offsetTuDo=(pageNumber-1)*limit;
		this.props.getTuDo(user.access_token, luckySpin.id, limit, (activeTuDo-1)).then(()=>{
			var data=this.props.dataTuDo;
			if(data!==undefined){
				if(data.status==='01'){
					this.setState({listTuDo:data.data, countTuDo:data.totalRecords, noti_tudo:false})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	getHistory=(user)=>{
		const {luckySpin, limit, activeHistory}=this.state;
		// var offsetTuDo=(pageNumber-1)*limit;
		this.props.getHistoryTuDo(user.access_token, luckySpin.id, limit, (activeHistory-1)).then(()=>{
			var data=this.props.dataHistoryTuDo;
			if(data!==undefined){
				if(data.status==='01'){
					this.setState({listHistory:data.data, countHistory:data.totalRecords})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	hideModalTuDo=()=>{
		$('#myModal2').modal('hide');
	}

	showModalCodeBonus=()=>{
		const {luckySpin, offsetCode, limit}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		if(user !== null){
			this.props.getCodeBonus(user.access_token, luckySpin.id, 'LUCKY_NUMBER').then(()=>{
				var data=this.props.dataCodeBonus;
				if(data!==undefined){
					if(data.status==='01'){
						console.log(data.data)
						this.setState({dataCodeBonus:data.data, countCodeBonus:data.data.length, listCodeBonus: data.data.slice(0,5), noti_mdt:false})
					}else{
						$('#myModal11').modal('show');
						this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
					}
				}else{
					$('#myModal12').modal('show');
					this.setState({server_err:true})
				}
			});
			$('#myModal4').modal('hide');
			$('#myModal3').modal('show');
		}else {
			$('#myModal5').modal('show');
		}
	}

	closePopupAuto=()=>{
		clearInterval(this.state.intervalId);
		this.setState({ isSpin:false, closeAuto:false});
		$('#myModal9').modal('hide');
	}

	hideModalCodeBonus=()=>{
		$('#myModal3').modal('hide');
	}

	showModalDetailBonus=()=>{
		$('#myModal4').modal('show');
	}

	hideModalDetailBonus=()=>{
		$('#myModal4').modal('hide');
	}
	closeServerErr=()=>{
		$('#myModal12').modal('hide');
	}

	closePopupFinish=()=>{
		$('#myModal13').modal('hide');
	}

	// hideModalCode=()=>{
	// 	$('#myModal7').modal('hide');
	// }


	handlePageChangeTuDo=(pageNumber)=> {
		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({activeTuDo: pageNumber},()=>{
			this.getDataTuDo(user, pageNumber)
		})
	}

	handlePageChangeHistory=(pageNumber)=> {
		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({activeHistory: pageNumber},()=>{
			this.getHistory(user, pageNumber)
		})
	}

	handlePageChangeCodeBonus=(pageNumber)=> {
		const {dataCodeBonus}=this.state;
		var newPosition=(pageNumber-1)*5
		this.setState({activeCodeBonus: pageNumber, listCodeBonus: dataCodeBonus.slice(newPosition, newPosition+5)});
	}

	handlePageChangeVinhDanh=(pageNumber)=> {
		this.setState({activeVinhDanh: pageNumber},()=>{
			this.getVinhDanh(pageNumber)
		})
		// const {dataVinhDanh}=this.state;
		// var newPosition=(pageNumber-1)*10
		// this.setState({activeVinhDanh: pageNumber, listVinhDanh: dataVinhDanh.slice(newPosition, newPosition+10)});
	}

	openTabNapScoin=(url)=> {
		window.open(url, '_blank').focus();
	}

	xacThuc=(url)=> {
		localStorage.removeItem("user");
		document.location.reload(true);
		$('#myModal8').modal('hide');
		window.open(url, '_blank').focus();
	}

	findCode=(evt)=>{
		var value=evt.target.value
		// this.setState({
		// 	inputValue: evt.target.value
		//   });
		const {dataCodeBonus}=this.state;
		var data=dataCodeBonus.filter(v=>v.description.indexOf(value)!==-1)
		this.setState({countCodeBonus:data.length, listCodeBonus:data.slice(0,5)})
	}

	showPopupLiveStream=()=>{
		var time=(1572868800000-Date.now())/1000;
		if(time>0){
			$('#myModal13').modal('show');
		}else{
			$('#myModal14').modal('show');
		}
	}

	randomItemIndex=()=>{
		// var item = items[Math.floor(Math.random()*items.length)];
	}

	render() {
		const {turnsBuyInfo,status_sukien, xacthuc, scoinCard,height, width, dialogLoginOpen, dialogBonus, auto, dialogWarning, textWarning, isLogin, userTurnSpin, day, hour, minute, second, code,numberPage, message_status, data_auto,message_error,
			 activeTuDo, activeHistory, activeCodeBonus, activeVinhDanh, limit, countCodeBonus, countTuDo, countHistory, countVinhDanh, listHistory, listCodeBonus, listTuDo, listVinhDanh,itemBonus, turnsFree, noti_mdt, noti_tudo, finished, hour_live, minute_live, second_live, user}=this.state;
		const { classes } = this.props;
		const notification_mdt=noti_mdt?(<span className="badge badge-pill badge-danger position-absolute noti-mdt">!</span>):(<span></span>);
		const notification_tudo=noti_tudo?(<span className="badge badge-pill badge-danger position-absolute noti-tudo">!</span>):(<span></span>);
		return (<div style={{backgroundColor:'#f5e4b9'}}>
			<a href="#logo" id="button"><img src={backtotop} alt="Back to Top" width="16" /></a>
			<div id="top" class="container-fluid header">
				<div class="container position-relative h-100 w-100">
					<ul class="box-account nav font-iCielPantonLight">
						{(isLogin)?(<div><li class="bg-acc nav-item text-center"><a class="d-block pt-03 text-orange" href="#" title="Xin chào Ngọc Trinh"><span class="text-white">Xin chào</span> Ngọc Trinh</a></li>
						<li class="bg-acc nav-item text-center" onClick={this.logoutAction}><a class="d-block pt-03 font-italic text-orange" href="#" title="Đăng xuất">Đăng Xuất</a></li></div>):(
							<li class="bg-acc nav-item text-center" onClick={this.loginAction}><a class="d-block pt-03 font-italic text-orange" href="#" title="Đăng xuất">Đăng Nhập</a></li>
						)}
						
					</ul>
					<div id="logo" class="logo"><img src={logo} class="img-fluid" /></div>
					<div class="table-responsive box-time">
						<h2 class="font-iCielPantonBlack text-brown-shadow">{status_sukien}</h2>
						<table class="table table-borderless tbl-boxtime" align="center">
							<tr>
								<td class="cell-timer-p1 text-white display-5 text-center font-weight-bold pb-0">{day}</td>
								<td class="cell-timer-p1 text-white display-5 text-center font-weight-bold pb-0">{hour}</td>
								<td class="cell-timer-p1 text-white display-5 text-center font-weight-bold pb-0">{minute}</td>
								<td class="cell-timer-p1 text-white display-5 text-center font-weight-bold pb-0">{second}</td>
							</tr>
							<tr>
								<td align="center" class="p-0 h6">Ngày</td>
								<td align="center" class="p-0 h6">Giờ</td>
								<td align="center" class="p-0 h6">Phút</td>
								<td align="center" class="p-0 h6">Giây</td>
							</tr>
						</table>
					</div>
					<div id="demo" class="carousel slide box-slider" data-ride="carousel">
					<div class="carousel-inner">
						<div class="carousel-item active mx-auto">
						<img src={banner_slider_1} class="img-fluid" />
						<div class="carousel-caption carousel-fix">
							<p>Chìa khóa còn lại: 200 <img src={key_yellow_icon} /></p>
						</div>   
						</div>
						<div class="carousel-item">
						<img src={banner_slider_1} class="img-fluid" />
						<div class="carousel-caption carousel-fix">
							<p>Chìa khóa còn lại: 200 <img src={key_yellow_icon} /></p>
						</div>   
						</div>
						<div class="carousel-item carousel-fix">
						<img src={banner_slider_1} class="img-fluid" />
						<div class="carousel-caption">
							<p>Chìa khóa còn lại: 200 <img src={key_yellow_icon} /></p>
						</div>   
						</div>
					</div>
					<a class="carousel-control-prev" href="#demo" data-slide="prev">
						<span class="carousel-control-prev-icon"></span>
					</a>
					<a class="carousel-control-next" href="#demo" data-slide="next">
						<span class="carousel-control-next-icon"></span>
					</a>
					</div>
					<div class="button-group mx-auto">
						<p class="text-center row mx-0">
						<a class="col-6 px-0" href="#" title="Mở 1 lần"><img src={btn_mo_x1} class="img-fluid" /></a>
						<a class="col-6 px-0" href="#" title="Mở tự động"><img src={btn_mo_tu_dong} class="img-fluid" /></a>
						</p>
						<p class="text-center">
						<a href="" title="Thêm lượt" data-toggle="modal" data-target="#ThemLuot"><img src={btn_them_luot} class="img-fluid img-75" /></a>
						</p>
					</div>
					<div class="float-left">
						<ul class="nav flex-column text-float-left">
							<li class="mt-5"><a href="https://scoin.vn/nap-game" title="Nạp Game" target="_blank">&nbsp;</a></li>
							<li class="mt-3"><a href="#TheLe" title="Thể lệ">&nbsp;</a></li>
							<li class="mt-3"><a href="#VinhDanh" title="Vinh danh">&nbsp;</a></li>
						</ul>
					</div>
					<div class="float-right">
						<ul class="nav flex-column text-float-right">
							<li class="mt-3"><a href="" title="Giải thưởng" data-toggle="modal" data-target="#GiaiThuong">&nbsp;</a></li>
							<li class="mt-3"><a href="#" title="Lịch sử" data-toggle="modal" data-target="#LichSu">&nbsp;</a></li>
						</ul>
					</div>
				</div>
			</div>
			{/* End p1 */}

			<div class="container thele" id="TheLe">
				<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center">Thể lệ sự kiện</h2>
				
				<div class="content-thele text-center mx-auto pt-4">
					<h4 class="font18 font-iCielPantonLight font-weight-bold">I. Đối tượng tham gia</h4>
					<p>Khách hàng có tài khoản Scoin. Nếu chưa có, đăng ký <a href="#" title="Đăng ký" target="_blank">tại đây</a>. <br /> Thời gian SK diễn ra từ 10:00 ngày 28.11 - hết ngày 28.12.2019.</p>
					<h4 class="font18 font-iCielPantonLight font-weight-bold">II. Cách tham gia:</h4>
					<div class="box-thele">
						<div class="step-thele mx-auto">
							<img src={bg_the_le_mobile} class="img-fluid bg-the-le-mobile" />
							<div class="card-deck mx-auto pt-5">
							<div class="card ml-4 bg-transparent border-0">
								<div class="card-body text-center">
									<h4><img src={img_step1} class="img-fluid" alt="Bước 1" /></h4>
									<p class="card-text font-iCielPantonBlack text-brown-shadow pt-3 font18">Nạp Game từ ví Scoin</p>
									<p class="py-2"><img src={arrow_down} alt="" /></p>
									<p class="card-text font-iCielPantonBlack text-brown-shadow font18">Nhận chìa khóa mở rương báu</p>
									<p class="card-text">Hoặc dùng Scoin mua <br />(giới hạn lượt/ngày)</p>
								</div>
							</div>
							<div class="card mx-0 bg-transparent border-0">
								<div class="card-body text-center">
									<h4><img src={img_step2} class="img-fluid" alt="Bước 2" /></h4>
									<p class="card-text font-iCielPantonBlack text-brown-shadow pt-3 font18">Truy cập trang sự kiện <br /><a href="#" title="Kho báu Scoin" class="font-iCielPantonBlack text-brown-shadow">www.khobauscoin.splay.vn</a></p>
									<p class="py-2"><img src={arrow_down} alt="" /></p>
									<p class="card-text font-iCielPantonBlack text-brown-shadow font18">Mở rương báu Scoin</p>
								</div>
							</div>
							<div class="card mr-4 bg-transparent border-0">
								<div class="card-body text-center">
									<h4><img src={img_step3} class="img-fluid"  alt="Bước 3" /></h4>
									<p class="card-text font-iCielPantonBlack text-brown-shadow pt-3 font18">Nhận thưởng Scoin</p>
									<p class="py-2"><img src={arrow_down} alt="" /></p>
									<p class="card-text font-iCielPantonBlack text-brown-shadow font18">Ví <a class="font-iCielPantonBlack text-brown-shadow" href="#" title="Scoin" target="_blank">www.scoin.vn</a></p>
								</div>
							</div>         
							</div>
						</div>
					</div>
					<h4 class="font18 font-iCielPantonLight font-weight-bold pt-3">Bảng quy đổi chìa khóa</h4>
					<h4 class="font16 font-iCielPantonLight font-weight-bold pt-2">Cách 1: Nạp Game từ ví Scoin (không giới hạn số lần nạp) <br />Nạp ví Scoin -> Game: cứ 50,000 Scoin sẽ nhận 1 Chìa khóa mở rương báu</h4>
					<h4 class="font16 font-iCielPantonLight font-weight-bold">Cách 2: Dùng thẻ Scoin mua trực tiếp</h4>
					<div class="table-responsive">
						<table class="table mx-auto bang-quy-doi my-3">
							<thead class="font18 font-iCielPantonLight font-weight-bold">
							<tr>
								<th class="h-100 align-middle font16">STT</th>
								<th class="font16">Giá mua <br />(Thẻ Scoin)</th>
								<th class="h-100 align-middle font16">Số chìa khóa nhận</th>
								<th class="h-100 align-middle font16">Lần mua/ngày</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td class="border-bottom-0 font16">1</td>
								<td class="border-bottom-0 font16">Thẻ 10k</td>
								<td class="border-bottom-0 font16">1</td>
								<td class="border-bottom-0 font16">5</td>
							</tr>
							<tr>
								<td class="border-bottom-0 border-top-0 font16">2</td>
								<td class="border-bottom-0 border-top-0 font16">Thẻ 20k</td>
								<td class="border-bottom-0 border-top-0 font16">2</td>
								<td class="border-bottom-0 border-top-0 font16">3</td>
							</tr>
							<tr id="VinhDanh">
								<td class="border-top-0 font16">3</td>
								<td class="border-top-0 font16">Thẻ 50k</td>
								<td class="border-top-0 font16">5</td>
								<td class="border-top-0 font16">1</td>
							</tr>                  
							</tbody>
						</table>
					</div>
					
				</div>
			</div>
			{/* End p2 */}


			<div class="container-fluid bang-vinh-danh-mobile mt-5">
				<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center"><img src={header_bang_vinh_danh} class="img-fluid" alt="Bảng vinh danh" /></h2>
				<div class="table-responsive">
					<table class="table mx-auto tbl-bang-vinh-danh-mobile">
						<thead class="font18 font-iCielPantonLight font-weight-bold">
						<tr>
							<th><p class="card-text font-iCielPantonBlack text-brown-shadow font18">Tên/Giải thưởng/Thời gian trúng</p></th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td><strong>Nguyễn Văn A</strong> <br />Xe máy Honda Airblade 2019 <br />16h40’13s ngày 20.07.2019</td>
						</tr>
						<tr>
							<td><strong>Nguyễn Thị B</strong> <br />Xe máy Honda Airblade 2019 <br />16h40’13s ngày 20.07.2019</td>
						</tr>
						<tr>
							<td><strong>Nguyễn Văn A</strong> <br />Xe máy Honda Airblade 2019 <br />16h40’13s ngày 20.07.2019</td>
						</tr>
						<tr>
							<td><strong>Nguyễn Thị B</strong> <br />Xe máy Honda Airblade 2019 <br />16h40’13s ngày 20.07.2019</td>
						</tr>
						<tr>
							<td><strong>Nguyễn Văn A</strong> <br />Xe máy Honda Airblade 2019 <br />16h40’13s ngày 20.07.2019</td>
						</tr>
						<tr>
							<td><strong>Nguyễn Thị B</strong> <br />Xe máy Honda Airblade 2019 <br />16h40’13s ngày 20.07.2019</td>
						</tr>
						</tbody>
					</table>
					<ul class="pagination justify-content-center pag-custom mt-4">
						<li class="page-item"><a class="page-link page-be" href="#">Trang đầu</a></li>
						<li class="page-item"><a class="page-link" href="#">1</a></li>
						<li class="page-item active"><a class="page-link" href="#">2</a></li>
						<li class="page-item"><a class="page-link" href="#">3</a></li>
						<li class="page-item"><a class="page-link" href="#">...</a></li>
						<li class="page-item"><a class="page-link page-be" href="#">Trang cuối</a></li>
					</ul> 
				</div>
			</div>
			
			<div class="container-fluid bang-vinh-danh">
				<div class="container pt-5 box-bang-vinh-danh">
					<div class="mt-5 bg-bang-vinh-danh mx-auto">
						<table class="table table-borderless tbl-bang-vinh-danh">
							<thead>
							<tr>
								<th><p class="font-iCielPantonBlack text-brown-shadow font18">Tên</p></th>
								<th><p class="font-iCielPantonBlack text-brown-shadow font18">Giải thưởng</p></th>
								<th><p class="font-iCielPantonBlack text-brown-shadow font18">Thời gian trúng</p></th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>Nguyễn Văn A</td>
								<td>Xe máy Honda Airblade 2019</td>
								<td>16h40’13s ngày 20.07.2019</td>
							</tr>
							<tr>
								<td>Nguyễn Văn A</td>
								<td>iPhone XS Max 64GB</td>
								<td>16h40’13s ngày 20.07.2019</td>
							</tr>
							<tr>
								<td>Nguyễn Văn A</td>
								<td>Xe máy Honda Airblade 2019</td>
								<td>16h40’13s ngày 20.07.2019</td>
							</tr>
							<tr>
								<td>Nguyễn Văn A</td>
								<td>iPhone XS Max 64GB</td>
								<td>16h40’13s ngày 20.07.2019</td>
							</tr>
							<tr>
								<td>Nguyễn Văn A</td>
								<td>Xe máy Honda Airblade 2019</td>
								<td>16h40’13s ngày 20.07.2019</td>
							</tr>
							<tr>
								<td>Nguyễn Văn A</td>
								<td>iPhone XS Max 64GB</td>
								<td>16h40’13s ngày 20.07.2019</td>
							</tr>
							<tr>
								<td>Nguyễn Văn A</td>
								<td>Xe máy Honda Airblade 2019</td>
								<td>16h40’13s ngày 20.07.2019</td>
							</tr>
							<tr>
								<td>Nguyễn Văn A</td>
								<td>iPhone XS Max 64GB</td>
								<td>16h40’13s ngày 20.07.2019</td>
							</tr>
							<tr>
								<td>Nguyễn Văn A</td>
								<td>Xe máy Honda Airblade 2019</td>
								<td>16h40’13s ngày 20.07.2019</td>
							</tr>
							<tr>
								<td>Nguyễn Văn A</td>
								<td>iPhone XS Max 64GB</td>
								<td>16h40’13s ngày 20.07.2019</td>
							</tr>
							</tbody>
						</table>
					</div>  
					<ul class="pagination justify-content-center pag-custom mt-4">
						<li class="page-item"><a class="page-link page-be" href="#">Trang đầu</a></li>
						<li class="page-item"><a class="page-link" href="#">1</a></li>
						<li class="page-item active"><a class="page-link" href="#">2</a></li>
						<li class="page-item"><a class="page-link" href="#">3</a></li>
						<li class="page-item"><a class="page-link" href="#">...</a></li>
						<li class="page-item"><a class="page-link page-be" href="#">Trang cuối</a></li>
					</ul>   	
				</div>
			</div>


			<div class="container-fluid footer text-center">
				<div class="container pt-3">
					<a href="https://daily.scoin.vn/huong-dan-mua-the/" title="Hướng dẫn mua thẻ" target="_blank"><img src={btn_huong_dan_mua_the} class="img-fluid img-mobile first-img" alt="Hướng dẫn mua thẻ" /></a>
					<a href="https://www.facebook.com/scoinvtcmobile/" title="Nhận thông báo sự kiện" target="_blank"><img src={btn_nhan_tb_sk} class="img-fluid img-mobile" alt="Nhận thông báo sự kiện" /></a>
					<a href="https://scoin.vn/nap-game" title="Nạp Scoin" target="_blank"><img src={btn_nap_scoin} class="img-fluid img-mobile" alt="Nạp Scoin" /></a>
					<a href="tel:19001104" title="Hotline" target="_blank"><img src={btn_hotline_hotro} class="img-fluid img-mobile" alt="Hotline" /></a>
				</div>
				<div class="container mt-5">
					<div class="logo-footer">
						<a href="#" title="VTC Mobile" target="_blank"><img src={logo_vtcmobile} width="150" alt="VTC Mobile" /></a>
						<a href="#" title="Splay" target="_blank"><img class="pl-3" src={logo_splay} width="100" alt="Splay" /></a>
						<p class="text-center pt-3 font16"><span class="text-uppercase">CÔNG TY CỔ PHẦN VTC DỊCH VỤ DI ĐỘNG</span> <br />VTC Mobile - Thành viên của Tổng Công ty Truyền thông đa phương tiện Viêt Nam VTC <br /> Tầng 11, tòa nhà VTC Online, số 18 Tam Trinh, phường Minh Khai, quận Hai Bà Trưng, Hà Nội.
			<br />Tel: (84-4).39877470 <br />Fax: 84-4).39877210<br /> <a href="mailto:vtcmobile@vtc.vn">vtcmobile@vtc.vn</a>
				</p>
					</div>
				</div>
			</div>

			{/* The Modal Phần thưởng */}
			<div class="modal fade" id="GiaiThuong">
				<div class="modal-dialog">
					<div class="modal-content bg-modal-content border-0" style={{marginTop: 60}}>
					<div class="modal-header border-bottom-0">
						<h4 class="modal-title"><img src={header_giaithuong} class="img-fluid header-giaithuong" /></h4>
						<button type="button" class="close" data-dismiss="modal"><img src={close_icon} class="img-fluid" /></button>
					</div>
					<div class="modal-body font16">
						<p class="d-pc-none">&rarr; Trả thẳng vào Ví Scoin của khách hàng</p>
						<div class="alert alert-giaithuong row mx-0 py-0 pl-0 mb-2">
							<div class="col-md-2 col-6 pl-0">
								<img src={ruong_icon} class="img-fluid" />
							</div>
							<div class="col-md-3 col-6 px-1 text-center pt-3">
								50 triệu <img src={logo_scoin} width="60" class="img-fluid" /> <br /> <span class="font-italic d-pc-none">Còn 3 giải</span>
							</div>
							<div class="col-md-2 px-1 d-mobile-none text-center pt-3">
								Còn 3 giải
							</div>
							<div class="col-md-5 px-1 d-mobile-none text-center pt-3">
								Trả thẳng vào Ví Scoin của khách hàng
							</div>
						</div>
						<div class="alert alert-giaithuong row mx-0 py-0 pl-0 mb-2">
							<div class="col-md-2 col-6 pl-0">
								<img src={ruong_icon} class="img-fluid" />
							</div>
							<div class="col-md-3 col-6 px-1 text-center pt-3">
								50 triệu <img src={logo_scoin} width="60" class="img-fluid" /> <br /> <span class="font-italic d-pc-none">Còn 3 giải</span>
							</div>
							<div class="col-md-2 px-1 d-mobile-none text-center pt-3">
								Còn 3 giải
							</div>
							<div class="col-md-5 px-1 d-mobile-none text-center pt-3">
								Trả thẳng vào Ví Scoin của khách hàng
							</div>
						</div>
					</div>

					</div>
				</div>
				</div>

			{/* The Modal them luot */}
			<div class="modal fade" id="ThemLuot">
				<div class="modal-dialog">
					<div class="modal-content bg-modal-content border-0">
					<div class="modal-header border-bottom-0">
						<button type="button" class="close" data-dismiss="modal"><img src={close_icon} class="img-fluid" /></button>
					</div>
					<div class="modal-body font16">
						<div class="w-75 mx-auto">
							<p class="font-iCielPantonBlack text-brown pt-5">Bạn muốn nhận thêm Chìa khóa mở rương báu Scoin?</p>
							<p class="font-iCielPantonBlack text-brown">Nạp game từ ví Scoin được tặng Chìa khóa:
					Cứ 50,000 Scoin sẽ nhận 1 Chìa khóa mở rương báu</p>
							<p class="text-danger">(không giới hạn giá trị nạp & số lần nạp)</p>
							<div class="alert alert-giaithuong">
								<p class="font-iCielPantonBlack text-brown">Scoin đã nạp từ ví vào Game: 10,005,000 Scoin</p>
								<p class="font-iCielPantonBlack text-brown">Chìa khóa đã nhận: 200 Chìa khóa <img src={key_yellow_icon} width="32" class="img-fluid" /></p>
								<p class="font-iCielPantonBlack text-brown">Nạp thêm 45,000 Scoin từ ví -> Game để nhận 1 Chìa khóa <img src={key_yellow_icon} width="32" class="img-fluid" /></p>
							</div>
							<p class="text-center w-75 mx-auto mt-4 mb-0"><a href="https://scoin.vn/nap-game" title="Nạp Game" target="_blank"><img src={btn_nap_game} class="img-fluid" /></a></p>
							<p class="text-center w-75 mx-auto mt-2"><a href="" title="Mua chìa khóa dùng thẻ Scoin" data-toggle="modal" data-target="#MuaChiaKhoa"><img src={btn_mua_chia_khoa} class="img-fluid" /></a></p>
						</div>
					</div>	  
					</div>
				</div>
				</div>

			{/* The Modal chia khoa */}
			{/* {(turnsBuyInfo !==undefined)?(<div class="modal fade" id="MuaChiaKhoa">
				<div class="modal-dialog">
					<div class="modal-content bg-modal-content border-0">
					<div class="modal-header border-bottom-0">
						<button type="button" class="close" data-dismiss="modal"><img src={close_icon} class="img-fluid" /></button>
					</div>
					<div class="modal-body">
						<p class="font-iCielPantonBlack text-brown">Bảng giá chìa khóa mua bằng thẻ Scoin</p>
						<div class="alert alert-giaithuong font16">
							<div class="row">
								<div class="col-5 px-2">
								<p class="pt-2 m-0 font-iCielPantonBlack text-brown">1 x Chìa khóa <img src={key_yellow_icon} width="16" class="img-fluid" /></p>
								</div>
								<div class="col-7 px-1 text-center">
									<p class="p-0 m-0"><span class="font-iCielPantonBlack text-brown">Giá: Thẻ Scoin 10k</span> <br /><span class="text-danger">Chỉ còn: {turnsBuyInfo[0].quantityCanBuy} lượt hôm nay</span></p>
								</div> 
							</div>           
						</div>
						<div class="alert alert-giaithuong font16">
							<div class="row">
								<div class="col-5 px-2">
								<p class="pt-2 m-0 font-iCielPantonBlack text-brown">2 x Chìa khóa <img src={key_yellow_icon} width="16" class="img-fluid" /></p>
								</div>
								<div class="col-7 px-1 text-center">
									<p class="p-0 m-0"><span class="font-iCielPantonBlack text-brown">Giá: Thẻ Scoin 20k</span> <br /><span class="text-danger">Chỉ còn: {turnsBuyInfo[1].quantityCanBuy} lượt hôm nay</span></p>
								</div> 
							</div>           
						</div>
						<div class="alert alert-giaithuong font16">
							<div class="row">
								<div class="col-5 px-2">
								<p class="pt-2 m-0 font-iCielPantonBlack text-brown">5 x Chìa khóa <img src={key_yellow_icon} width="16" class="img-fluid" /></p>
								</div>
								<div class="col-7 px-1 text-center">
									<p class="p-0 m-0"><span class="font-iCielPantonBlack text-brown">Giá: Thẻ Scoin 50k</span> <br /><span class="text-danger">Chỉ còn: {turnsBuyInfo[2].quantityCanBuy} lượt hôm nay</span></p>
								</div> 
							</div>           
						</div>
						<div class="mx-auto">
							<p class="text-center w-50 mx-auto mt-3"><a href="#" title="Xác nhận mua"><img src={btn_xac_nhan_mua} class="img-fluid" /></a></p>
						</div>
						
					</div>	  
					</div>
				</div>
				</div>):(<div></div>)} */}
			


			{/* The Modal Lich su */}
			<div class="modal fade" id="LichSu">
				<div class="modal-dialog">
					<div class="modal-content bg-modal-content border-0">
					<div class="modal-header border-bottom-0">
						<button type="button" class="close" data-dismiss="modal"><img src={close_icon} class="img-fluid" /></button>
					</div>
					<div class="modal-body">
						<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0">Lịch Sử</h2>
						<div class="">
							<ul class="nav nav-pills justify-content-between pag-custom">
							<li class="nav-item">
								<a class="nav-link active font16 px-2" data-toggle="tab" href="#TGiaiThuong">Giải thưởng</a>
							</li>
							<li class="nav-item">
								<a class="nav-link font16 px-2" data-toggle="tab" href="#TMoRuong">Mở Rương</a>
							</li>
							<li class="nav-item">
								<a class="nav-link font16 px-2" data-toggle="tab" href="#TNhanChiaKhoa">Nhận chìa khóa</a>
							</li>
							</ul>            
							<div class="tab-content">
							<div class="tab-pane container active" id="TGiaiThuong">
								<div class="d-pc-none pt-3">
									<table class="table mx-auto tbl-bang-vinh-danh-mobile text-center">
										<thead class="font-iCielPantonLight font-weight-bold">
										<tr>
											<th><p class="card-text font-iCielPantonBlack text-brown-shadow font16">Tên/Nội dung/Thời gian trúng</p></th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td class="font14"><strong>Nguyễn Văn A</strong> <br />Xe máy Honda Airblade 2019 <br />16h40’13s ngày 20.07.2019</td>
										</tr>
										<tr>
											<td class="font14"><strong>Nguyễn Thị B</strong> <br />Xe máy Honda Airblade 2019 <br />16h40’13s ngày 20.07.2019</td>
										</tr>
										<tr>
											<td class="font14"><strong>Nguyễn Văn A</strong> <br />Xe máy Honda Airblade 2019 <br />16h40’13s ngày 20.07.2019</td>
										</tr>
										<tr>
											<td class="font14"><strong>Nguyễn Thị B</strong> <br />Xe máy Honda Airblade 2019 <br />16h40’13s ngày 20.07.2019</td>
										</tr>
										<tr>
											<td class="font14"><strong>Nguyễn Văn A</strong> <br />Xe máy Honda Airblade 2019 <br />16h40’13s ngày 20.07.2019</td>
										</tr>
										
										</tbody>
									</table>
									<ul class="pagination justify-content-center pag-custom mt-4">
										<li class="page-item"><a class="page-link page-be" href="#">Trang đầu</a></li>
										<li class="page-item"><a class="page-link" href="#">1</a></li>
										<li class="page-item active"><a class="page-link" href="#">2</a></li>
										<li class="page-item"><a class="page-link" href="#">3</a></li>
										<li class="page-item"><a class="page-link" href="#">...</a></li>
										<li class="page-item"><a class="page-link page-be" href="#">Trang cuối</a></li>
									</ul> 
								</div>
								<div class="table-responsive d-mobile-none">
									<table class="table table-borderless text-center mb-2">
										<thead>
										<tr>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Tên</p></th>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Nội dung</p></th>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Thời gian trúng</p></th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td>Nguyễn Văn A</td>
											<td>Xe máy Honda Airblade 2019</td>
											<td>16h40’13s ngày 20.07.2019</td>
										</tr>

										</tbody>
									</table>
								
								<ul class="pagination justify-content-center pag-custom">
									<li class="page-item"><a class="page-link page-be" href="#">Trang đầu</a></li>
									<li class="page-item"><a class="page-link" href="#">1</a></li>
									<li class="page-item active"><a class="page-link" href="#">2</a></li>
									<li class="page-item"><a class="page-link" href="#">3</a></li>
									<li class="page-item"><a class="page-link" href="#">...</a></li>
									<li class="page-item"><a class="page-link page-be" href="#">Trang cuối</a></li>
								</ul>
								</div> 
							</div>
							<div class="tab-pane container fade" id="TMoRuong">
								<div class="d-pc-none pt-3">
									<table class="table mx-auto tbl-bang-vinh-danh-mobile text-center">
										<thead class="font-iCielPantonLight font-weight-bold">
										<tr>
											<th><p class="card-text font-iCielPantonBlack text-brown-shadow font16">STT/Kết quả/Thời gian</p></th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td class="font14"><strong>Nguyễn Văn A</strong> <br />Xe máy Honda Airblade 2019 <br />16h40’13s ngày 20.07.2019</td>
										</tr>
										
										</tbody>
									</table>
									<ul class="pagination justify-content-center pag-custom mt-4">
										<li class="page-item"><a class="page-link page-be" href="#">Trang đầu</a></li>
										<li class="page-item"><a class="page-link" href="#">1</a></li>
										<li class="page-item active"><a class="page-link" href="#">2</a></li>
										<li class="page-item"><a class="page-link" href="#">3</a></li>
										<li class="page-item"><a class="page-link" href="#">...</a></li>
										<li class="page-item"><a class="page-link page-be" href="#">Trang cuối</a></li>
									</ul> 
								</div>
								<div class="table-responsive d-mobile-none">
									<table class="table table-borderless text-center mb-2">
										<thead>
										<tr>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">STT</p></th>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Kết quả</p></th>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Thời gian</p></th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td>Nguyễn Văn A</td>
											<td>Xe máy Honda Airblade 2019</td>
											<td>16h40’13s ngày 20.07.2019</td>
										</tr>
										</tbody>
									</table>
								
								<ul class="pagination justify-content-center pag-custom">
									<li class="page-item"><a class="page-link page-be" href="#">Trang đầu</a></li>
									<li class="page-item"><a class="page-link" href="#">1</a></li>
									<li class="page-item active"><a class="page-link" href="#">2</a></li>
									<li class="page-item"><a class="page-link" href="#">3</a></li>
									<li class="page-item"><a class="page-link" href="#">...</a></li>
									<li class="page-item"><a class="page-link page-be" href="#">Trang cuối</a></li>
								</ul>
								</div>
							</div>
							<div class="tab-pane container fade" id="TNhanChiaKhoa">
								<div class="d-pc-none pt-3">
									<table class="table mx-auto tbl-bang-vinh-danh-mobile text-center">
										<thead class="font-iCielPantonLight font-weight-bold">
										<tr>
											<th><p class="card-text font-iCielPantonBlack text-brown-shadow font16">STT/Số lượng/Thời gian</p></th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td class="font14"><strong>Nguyễn Văn A</strong> <br />Xe máy Honda Airblade 2019 <br />16h40’13s ngày 20.07.2019</td>
										</tr>
										
										</tbody>
									</table>
									<ul class="pagination justify-content-center pag-custom mt-4">
										<li class="page-item"><a class="page-link page-be" href="#">Trang đầu</a></li>
										<li class="page-item"><a class="page-link" href="#">1</a></li>
										<li class="page-item active"><a class="page-link" href="#">2</a></li>
										<li class="page-item"><a class="page-link" href="#">3</a></li>
										<li class="page-item"><a class="page-link" href="#">...</a></li>
										<li class="page-item"><a class="page-link page-be" href="#">Trang cuối</a></li>
									</ul> 
								</div>
								<div class="table-responsive d-mobile-none">
									<table class="table table-borderless text-center mb-2">
										<thead>
										<tr>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">STT</p></th>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Số lượng</p></th>
											<th><p class="font-iCielPantonBlack text-brown-shadow font18 mb-0">Thời gian</p></th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td>Nguyễn Văn A</td>
											<td>Xe máy Honda Airblade 2019</td>
											<td>16h40’13s ngày 20.07.2019</td>
										</tr>
										</tbody>
									</table>
								
								<ul class="pagination justify-content-center pag-custom">
									<li class="page-item"><a class="page-link page-be" href="#">Trang đầu</a></li>
									<li class="page-item"><a class="page-link" href="#">1</a></li>
									<li class="page-item active"><a class="page-link" href="#">2</a></li>
									<li class="page-item"><a class="page-link" href="#">3</a></li>
									<li class="page-item"><a class="page-link" href="#">...</a></li>
									<li class="page-item"><a class="page-link page-be" href="#">Trang cuối</a></li>
								</ul>
								</div>
							</div>
							</div>
						</div>
						
					</div>	  
					</div>
				</div>
				</div>
			{/* The Modal Thông báo chúc mừng */}
			<div className="modal" id="myModal4">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<button type="button" className="close" data-dismiss="modal"><img src={close_icon} alt="Đóng" /></button>
						</div>

					{/* <!-- Modal body --> */}
						<div className="modal-body bg-chucmung justify-content-center">
							<div className="card">
								<div className="card-body content-chucmung mx-auto">
									{(code)?(
									<div>
										<div className="text-chucmung text-center" style={{marginTop:70}}>
											<span className="text-white">Bạn vừa quay vào ô</span>
											<span className="pt-1 d-block">Mã số dự thưởng iPhone 11 Pro Max 256GB đã được lưu trong Mã dự thưởng.</span>
											{/* <span className="pt-1 d-block">Bạn vừa nhận được Mã số dự thưởng giải hiện vật <span style={{fontWeight:'bold'}}>iPhone 11 Pro Max 256GB</span></span> */}
										</div>
										{/* <p style={{textAlign:'center', fontSize:30, fontWeight:'bold'}}>{itemBonus.value}</p> */}
									
										<p className="small pt-2 mb-2 text-center">So KQ Mã số dự thưởng vào lúc 19:00 ngày 04/11/2019.<br /><label title="Xem phần thưởng" className="underline pt-2 d-block" style={{color:"#fff", cursor:'pointer'}} onClick={this.showModalCodeBonus}>Xem phần thưởng</label></p>
										<button type="button" className="btn btn-xacnhan text-white btn-block text-center" onClick={this.hideModalDetailBonus}>Xác nhận</button>
									</div>
									):(
									<div>
										{(scoinCard)?(<div><div className="text-chucmung text-center" style={{marginTop:70}}>
											<span>Bạn vừa quay vào ô <span style={{color:'red'}}>thẻ Scoin {itemBonus.value}VND</span></span>
										</div>
										<p className="small pt-2 mb-2 text-center">(Phần thưởng đã được chuyển vào Tủ đồ sự kiện) <br /><label title="Xem phần thưởng" className="underline pt-2 d-block" style={{color:"#fff", cursor:'pointer'}} onClick={this.showModalTuDo}>Xem phần thưởng</label></p></div>):(
											<div>
											<div className="text-chucmung text-center" style={{marginTop:70}}>
											<span>Bạn vừa nhận được <span style={{color:'red'}}>{itemBonus.value} Scoin</span></span>
										</div>
										<p className="small pt-2 mb-2 text-center">(Phần thưởng đã được cộng vào ví Scoin)</p>
										</div>
										)}
									
										<button type="button" className="btn btn-xacnhan text-white btn-block text-center" onClick={this.hideModalDetailBonus}>Xác nhận</button>
									</div>
									)}	
									


								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo đăng nhập--> */}
			<div className="modal fade" id="myModal5">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0">Thông Báo</h2>
						<button type="button" className="close" data-dismiss="modal"><img src={close_icon} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">Xin vui lòng đăng nhập!</h5>
							<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={this.loginAction}>Đăng nhập</button>
						</div>       
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo đăng nhập--> */}
			<div className="modal fade" id="myModal6" style={{zIndex:10002}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0">Thông Báo</h2>
						<button type="button" className="close" data-dismiss="modal"><img src={close_icon} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">Bạn đã hết lượt quay!</h5>
							<p className="text-thele lead text-center">Hãy nạp Scoin để nhận thêm lượt chơi Vòng quay tháng 10.</p>
							<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={()=>this.openTabNapScoin('https://scoin.vn/nap-game')}>Nạp Game</button>
							{/* <button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={()=>this.openTabNapScoin('http://sandbox.scoin.vn/nap-vao-game?GameId=330287')}>Nạp Game</button> */}
						</div>       
					</div>

					</div>
				</div>
			</div>

			<div className="modal fade" id="myModal8">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0">Thông Báo</h2>
						<button type="button" className="close" data-dismiss="modal"><img src={close_icon} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">{message_status}</h5>
							{(xacthuc)?(<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={()=>this.xacThuc('https://scoin.vn/cap-nhat-sdt')}>Xác Thực</button>):(<div></div>)}
							
						</div>       
					</div>

					</div>
				</div>
			</div>


			<div className="modal fade" id="myModal9" data-keyboard="false" data-backdrop="static" style={{zIndex:10000}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					<div className="modal-header border-bottom-0">
						<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0">Thông Báo</h2>
						<button className="close" onClick={this.closePopupAuto}><img src={close_icon} alt="Đóng" /></button>
					</div>

					<div className="modal-body">
						<div className="table-responsive mt-2">
							<h3 className="text-purple text-center">Kết quả quay tự động</h3>
							<ol className="list-group list-group-flush">
								{data_auto.map((obj, key) => (
									<li className="list-group-item" key={key}>{key+1}. {obj}</li>
								))}
							</ol> 
							
							<p className="text-thele">Vào <code><label onClick={this.showModalTuDo}>Tủ đồ</label></code> hoặc <code><label onClick={this.showModalCodeBonus}>Mã dự thưởng</label></code> để xem chi tiết.</p>
							<p className="text-thele text-center"><code>Đang quay tự động <span className="spinner-grow spinner-grow-sm"></span></code></p>
						</div>
						
					</div>

					</div>
				</div>
			</div>

			<div className="modal fade" id="myModal10">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					<div className="modal-header border-bottom-0">
						<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0">Thông Báo</h2>
						<button type="button" className="close" data-dismiss="modal"><img src={close_icon} alt="Đóng" /></button>
					</div>
					<div className="modal-body">
						<div className="table-responsive mt-2">
							<h5 class="text-center">Bạn sẽ nhận được lượt chơi miễn phí khi nạp thẻ Scoin vào game của VTC Mobile.</h5>
							<table className="table table-striped mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
								<thead>
									<tr>
										<th colspan="4">Nạp thẻ Scoin vào game</th>                    
									</tr>
									<tr>
										<th>STT</th>
										<th>Mệnh giá thẻ Scoin (VNĐ)</th>
										<th>Số lượt quay chuẩn</th>
										<th>Số lượt quay (đã cộng)</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>1</td>
										<td>50.000</td>
										<td>1</td>
										<td></td>
									</tr>
									<tr>
										<td>2</td>
										<td>100.000</td>
										<td>2</td>
										<td></td>
									</tr>
									<tr>
										<td>3</td>
										<td>200.000</td>
										<td>4</td>
										<td></td>
									</tr>
									<tr>
										<td>4</td>
										<td>300.000</td>
										<td>6</td>
										<td></td>
									</tr>
									<tr>
										<td>5</td>
										<td>500.000</td>
										<td>10</td>
										<td></td>
									</tr>
									<tr>
										<td>6</td>
										<td>1.000.000</td>
										<td>22</td>
										<td>10%</td>
									</tr>
									<tr>
										<td>7</td>
										<td>2.000.000</td>
										<td>44</td>
										<td>10%</td>
									</tr>
									<tr>
										<td>8</td>
										<td>5.000.000</td>
										<td>120</td>
										<td>20%</td>
									</tr>
								</tbody>
							</table> 
							<div class="btn-logout position-relative w-25 mx-auto text-center left-0 top-0">
								<h5 class="text-center" onClick={()=>this.openTabNapScoin('https://scoin.vn/nap-game')}><a>Nạp</a></h5>
								{/* <h5 class="text-center" onClick={()=>this.openTabNapScoin('http://sandbox.scoin.vn/nap-vao-game?GameId=330287')}><a>Nạp</a></h5> */}
							</div>             
						</div>
						
					</div>

					</div>
				</div>
				</div>

			<div className="modal fade" id="myModal11">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0">Thông Báo</h2>
						<button type="button" className="close" data-dismiss="modal"><img src={close_icon} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">{message_error}</h5>
						</div>       
					</div>

					</div>
				</div>
			</div>
			<div className="modal fade" id="myModal12">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0">Thông Báo</h2>
						<button type="button" className="close" data-dismiss="modal"><img src={close_icon} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">Thông báo bảo trì!</h5>
							<h5 className="text-thele lead text-center">Hệ thống đang được nâng cấp để tối ưu. Vui lòng quay lại sau 10 phút.</h5>
							<h5 className="text-thele lead text-center">Xin lỗi vì sự bất tiện này</h5>
							<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={this.closeServerErr}>Xác nhận</button>
						</div>       
					</div>

					</div>
				</div>
			</div>

			<div className="modal fade" id="myModal13">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h2 class="font-iCielPantonBlack text-brown-shadow text-uppercase text-center pb-0">Thông Báo</h2>
						<button type="button" className="close" data-dismiss="modal"><img src={close_icon} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2"> 
							<h3 class="text-center text-red">Livestream chưa diễn ra.</h3>          
							<h5 className="text-thele lead text-center">Mời quay lại vào lúc 19:00 ngày 04/11/2019 để xem trực tiếp buổi so Mã dự thưởng trúng iPhone 11 Pro Max 256Gb</h5>
							<p class="text-center text-thele">Phát sóng trực tiếp tại trang sự kiện <a style={{color:'#0066ff', textDecoration:'underline'}}>https://vongquayt10.splay.vn</a></p>
							<p class="text-center text-thele">Và fanpage Scoin: <a href="https://www.facebook.com/scoinvtcmobile" title="Fanpage Scoin" target="_blank">https://www.facebook.com/scoinvtcmobile</a></p>
							<h5 className="text-thele lead text-center">BTC trân trọng thông báo.</h5>
							<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={this.closePopupFinish}>Xác nhận</button>
						</div>       
					</div>

					</div>
				</div>
			</div>
			<ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onResize} />


		</div>)
	}
}

const mapStateToProps = state => ({
	dataProfile: state.profile.data,
	dataRotation:state.lucky.dataRotation,
	dataRotationWithUser:state.lucky.dataRotationWithUser,
	dataPick: state.lucky.dataPick,
	dataDetail: state.lucky.dataDetail,
	dataTurn: state.lucky.dataTurn,
	dataTuDo: state.lucky.dataTuDo,
	dataHistoryTuDo: state.lucky.dataHistoryTuDo,
	dataVinhDanh: state.lucky.dataVinhDanh,
	dataCodeBonus: state.lucky.dataCodeBonus,
	server:state.server.serverError,
	waiting: state.lucky.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn,
	getHistoryTuDo,
	getData,
	getTuDo,
	getCodeBonus,
	getVinhDanh,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_Rotation)