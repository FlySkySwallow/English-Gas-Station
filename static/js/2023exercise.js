infoJSON = "([{'desc':'人称代词；主语、谓语、宾语；查词典', 'files':[ {'address': '../static/raw/pdf/2023暑期英语英语练习(1).pdf', 'name': '2023暑期英语英语练习(1) 题目.pdf'} , {'address': '../static/raw/pdf/2023暑期英语英语练习(1) 答案.pdf', 'name': '2023暑期英语英语练习(1) 答案.pdf'} , {'address': '../static/raw/audio/2023暑期英语英语练习(1) 听力材料.mp3', 'name': '2023暑期英语英语练习(1) 听力材料.mp3'} ]   }, 	{'desc':'物主代词、反身代词、指示代词', 'files':[ {'address': '../static/raw/pdf/2023暑期英语英语练习(2).pdf', 'name': '2023暑期英语英语练习(2) 题目.pdf'} , {'address': 'none', 'name': '2023暑期英语英语练习(2) 答案.pdf'} ]   }  ])";

info = eval(infoJSON);
selectedRow = 0;

window.onload = function() {
displayTable();
}

function displayTable() {
var table = document.getElementById("2023exercise");

// 删除所有除第一行的tr
var trs = table.getElementsByTagName("tr");
var l = trs.length;
for (var i = 1; i < l; i++)
table.removeChild(trs[1]);

// 添加新的tr
for (var i = 0; i < info.length; i++)
displayRow(table, i+1, info[i]);

}

function displayRow(table, index, data) {
// 展示当前一行
var tr = document.createElement("tr");
var td_index = document.createElement("td");
var td_desc = document.createElement("td");
var td_files = document.createElement("td");
tr.appendChild(td_index);
tr.appendChild(td_desc);
tr.appendChild(td_files);
table.appendChild(tr);

td_index.innerHTML=index;
td_desc.innerHTML=data.desc;
td_files.innerHTML="<span id='bu' onclick='changeIndex(this)'>查看</span>";


// 若该行选中
if (selectedRow == index)
{
var desc = td_desc.innerHTML;
td_files.innerHTML="<span id='bu' onclick='changeIndex(this)'>收起</span>";
var exerCount = info[index-1]['files'].length; // 所选的练习包含的文件数
var files = info[index-1]['files']; // 文件字典对象的数组
var addresses = [], names = []; //文件地址、文件名
for (var i = 0; i < files.length; i++) {
addresses.push(files[i]['address']);
names.push(files[i]['name']);
}
for (var i = 0; i < files.length; i++)
desc+="<p id='bu' onclick=\"downloadFile('" + addresses[i] + "', '"+names[i]+"')\">"+names[i]+"</p>";
td_desc.innerHTML=desc;

}
}

function changeIndex(td) {
index = Number(td.parentNode.parentNode.firstChild.innerHTML);
selectedRow = selectedRow == index ? 0 : index;
displayTable();


}


function downloadFile(address,name) {
if (address == 'none')
alert('该文件暂未公开，无法查看。');
else {
 var element = document.createElement('a');
  element.setAttribute('href', address.replace('/','\\\\'));
  element.setAttribute('download', name);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
}

