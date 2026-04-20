// 加载和保存本地数据
function saveDataToLocalStorage(data) {
    localStorage.setItem('alarmData', JSON.stringify(data));
}

function loadDataFromLocalStorage() {
    const json = localStorage.getItem('alarmData');
    return json ? JSON.parse(json) : [];
}

// 添加新行并保存
function addRow() {
    const faultType = document.getElementById("faultType").value.trim();
    const faultTime = document.getElementById("faultTime").value;
    const faultStatus = document.getElementById("faultStatus").value;

    if (!faultType || !faultTime) {
        alert("请完整填写故障类型和时间！");
        return;
    }

    const alarmData = loadDataFromLocalStorage();
    alarmData.push({
        type: faultType,
        time: faultTime,
        status: faultStatus
    });

    saveDataToLocalStorage(alarmData);
    renderTable();

    // 清空表单
    document.getElementById("faultType").value = '';
    document.getElementById("faultTime").value = '';
    document.getElementById("faultStatus").value = '';
    // generateFailureChart();  // 添加或删除后更新图表
    // document.dispatchEvent(new Event('alarmDataUpdated'));
    return true; // 返回true表示添加成功

}


// 删除一行并更新本地数据
function deleteRow(button) {
    const rowIndex = button.parentElement.parentElement.rowIndex - 1; // 减去thead
    const alarmData = loadDataFromLocalStorage();
    alarmData.splice(rowIndex, 1);
    saveDataToLocalStorage(alarmData);
    renderTable();
    // 添加50ms延迟后刷新页面
    setTimeout(() => {
        location.reload();
    }, 50);
    // generateFailureChart();  // 添加或删除后更新图表
    // document.dispatchEvent(new Event('alarmDataUpdated'));
    return true; // 返回true表示添加成功
}

// 渲染整个表格
function renderTable() {
    const tableBody = document.querySelector("#alarmTable tbody");
    tableBody.innerHTML = '';
    const alarmData = loadDataFromLocalStorage();

    alarmData.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = index + 1;
        row.insertCell(1).innerText = item.type;
        row.insertCell(2).innerText = formatDateTime(item.time);

        const statusCell = row.insertCell(3);
        statusCell.innerText = item.status === 'processed' ? '已处理' : '未处理';
        statusCell.className = item.status;

        const actionCell = row.insertCell(4);
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "删除";
        deleteBtn.onclick = function () {
            deleteRow(deleteBtn);
        };
        actionCell.appendChild(deleteBtn);
    });
}

// 时间格式化函数
function formatDateTime(datetimeStr) {
    const dt = new Date(datetimeStr);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    const hh = String(dt.getHours()).padStart(2, '0');
    const mi = String(dt.getMinutes()).padStart(2, '0');
    const ss = String(dt.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

// 模态框控制
const openBtn = document.getElementById('openAddModalBtn');
const closeBtn = document.getElementById('closeAddModalBtn');
const modal = document.getElementById('addModal');
const form = document.getElementById('addForm');

openBtn.onclick = () => {
    modal.style.display = 'flex';
};

closeBtn.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// 表单提交处理
form.onsubmit = async (e) => {
    e.preventDefault();

    // 先执行添加操作
    addRow();  // 这会保存数据到localStorage

    // 关闭弹窗
    modal.style.display = 'none';
    form.reset();

    // 立即刷新页面
    setTimeout(() => {
    location.reload();
}, 50);
};


// 页面加载时初始化
window.onload = () => {
    renderTable();
};
