from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from datetime import timedelta

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # 用于加密session，建议使用复杂字符串
app.permanent_session_lifetime = timedelta(minutes=30)  # 设置session有效期

# 假设用户名密码写死，真实情况可接数据库
VALID_USERNAME = 'admin'
VALID_PASSWORD = '123456'


@app.route('/')
def home():
    if 'user' in session:
        voltage_threshold = session.get('voltage_threshold', DEFAULT_VOLTAGE_THRESHOLD)
        temperature_threshold = session.get('temperature_threshold', DEFAULT_TEMPERATURE_THRESHOLD)
        return render_template('index.html',
                            voltage_threshold=voltage_threshold,
                            temperature_threshold=temperature_threshold)
    else:
        flash("请先登录")
        return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username == VALID_USERNAME and password == VALID_PASSWORD:
            session.permanent = True  # 启用长期会话
            session['user'] = username
            return redirect(url_for('home'))
        else:
            flash('用户名或密码错误！')
            return redirect(url_for('login'))
    return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('user', None)
    flash("您已退出登录")
    return redirect(url_for('login'))

# @app.route('/adjust')
# def adjust():
#     if 'user' in session:
#         return render_template('adjust.html')  # 渲染你的调整页面
#     else:
#         flash("请先登录")
#         return redirect(url_for('login'))
@app.route('/')
def index():
    # 从 session 获取阈值设置
    voltage = session.get('voltage', '4.20')
    temperature = session.get('temperature', '100')
    return render_template('index.html', voltage=voltage, temperature=temperature)

@app.route('/adjust')
def adjust():
    # 加载调整页面，并传递当前设置值
    voltage = session.get('voltage', '4.20')
    temperature = session.get('temperature', '100')
    return render_template('adjust.html', voltage=voltage, temperature=temperature)

# Default thresholds
DEFAULT_VOLTAGE_THRESHOLD = 4.2
DEFAULT_TEMPERATURE_THRESHOLD = 100


@app.route('/threshold', methods=['GET', 'POST'])
def handle_threshold():
    if request.method == 'GET':
        # Return current threshold values
        return jsonify({
            'voltage': session.get('voltage_threshold', DEFAULT_VOLTAGE_THRESHOLD),
            'temperature': session.get('temperature_threshold', DEFAULT_TEMPERATURE_THRESHOLD)
        })
    elif request.method == 'POST':
        # Update threshold values
        data = request.get_json()
        try:
            voltage = float(data.get('voltage', DEFAULT_VOLTAGE_THRESHOLD))
            temperature = float(data.get('temperature', DEFAULT_TEMPERATURE_THRESHOLD))

            # Validate inputs
            if voltage <= 0 or temperature <= -273:  # Absolute zero check
                return jsonify({'status': 'error', 'message': 'Invalid threshold values'}), 400

            session['voltage_threshold'] = voltage
            session['temperature_threshold'] = temperature
            return jsonify({'status': 'success'})
        except (ValueError, TypeError):
            return jsonify({'status': 'error', 'message': 'Invalid data format'}), 400
@app.route('/threshold', methods=['POST'])
def set_threshold():
    data = request.json
    voltage = data.get('voltage')
    temperature = data.get('temperature')

    # 简单校验并存入 session
    if voltage is not None:
        session['voltage'] = float(voltage)
    if temperature is not None:
        session['temperature'] = float(temperature)

    return jsonify({'status': 'success'})


if __name__ == '__main__':
    app.run(debug=True)

if __name__ == '__main__':
    app.run(debug=True)
