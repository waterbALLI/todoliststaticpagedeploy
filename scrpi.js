document.addEventListener('DOMContentLoaded', function () {
    // 获取DOM元素
    const userForm = document.getElementById('userForm');
    const userTable = document.getElementById('userTable');
    const alertBox = document.getElementById('alertBox');

    // 从localStorage加载用户数据
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // 显示提示信息
    function showAlert(message, type = 'success') {
        alertBox.textContent = message;
        alertBox.className = type === 'success' ? 'alert alert-success' : 'alert alert-error';
        alertBox.style.display = 'block';

        // 3秒后隐藏提示
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 3000);
    }

    // 渲染用户表格
    function renderUserTable() {
        const tbody = userTable.querySelector('tbody');
        tbody.innerHTML = '';

        if (users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">暂无用户数据</td></tr>';
            return;
        }

        users.forEach((user, index) => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                        <td>${user.name}</td>
                        <td>${user.phone}</td>
                        <td>${user.idCard}</td>
                        <td class="actions">
                            <div class="btn-group">
                                <button class="btn-edit" onclick="editUser(${index})">编辑</button>
                                <button class="btn-delete" onclick="deleteUser(${index})">删除</button>
                            </div>
                        </td>
                    `;

            tbody.appendChild(tr);
        });
    }

    // 添加用户
    userForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const idCard = document.getElementById('idCard').value.trim();

        // 简单验证
        if (!name || !phone || !idCard) {
            showAlert('请填写所有字段', 'error');
            return;
        }

        // 添加到用户数组
        users.push({
            name,
            phone,
            idCard
        });

        // 保存到localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // 重新渲染表格
        renderUserTable();

        // 显示成功消息
        showAlert('用户添加成功');

        // 重置表单
        userForm.reset();
    });

    // 编辑用户
    window.editUser = function (index) {
        const user = users[index];

        // 填充表单
        document.getElementById('name').value = user.name;
        document.getElementById('phone').value = user.phone;
        document.getElementById('idCard').value = user.idCard;

        // 删除旧记录
        users.splice(index, 1);

        // 更新localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // 重新渲染表格
        renderUserTable();

        showAlert('现在可以编辑用户信息');
    };

    // 删除用户
    window.deleteUser = function (index) {
        if (confirm('确定要删除这个用户吗？')) {
            users.splice(index, 1);

            // 更新localStorage
            localStorage.setItem('users', JSON.stringify(users));

            // 重新渲染表格
            renderUserTable();

            showAlert('用户已删除');
        }
    };

    // 初始渲染表格
    renderUserTable();
});