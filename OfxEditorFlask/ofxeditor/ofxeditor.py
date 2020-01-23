import os
import sys
import atexit
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, jsonify, Response
from flask import Flask, session, g, redirect, url_for, abort, render_template, flash, jsonify, Response
import json
from werkzeug.datastructures import ImmutableMultiDict
import unicodedata
import time
import http
import array
import pymongo
import urllib


app = Flask(__name__)

env_vars_fd = open("ofxeditor.env","r")
env_vars_list = env_vars_fd.readlines()
env_var_dict = {}
for env_var in env_vars_list:
	env_var = env_var.replace('\n','')
	env_key_value = env_var.split(':')
	os.environ[env_key_value[0]] = env_key_value[1]
	


mongo_uri = 'mongodb://' + os.environ['MONGODB_HOSTNAME'] + ':27017'
ofxeditor_client = pymongo.MongoClient(mongo_uri)



editor_db = ofxeditor_client["editordb"]
combos = editor_db["combos"]

results = combos.find({},{'_id':0, 'name':1})
components = editor_db["components"]


def get_combo_list():
	print("ENTERING get_combo_list")
	combo_list_data = []
	try:
		results = combos.find({},{'_id':0, 'name':1})
		for x in results:
			name = x['name']
			print(name)
			combo_list_data.append({'name':name})

	except Exception as e:
		print(e)

	print("EXITING get_combo_list")
	return combo_list_data


def get_components():
	print("ENTERING get_components")
	components_data = []
	try:
		query_all = {
			'_id':0, 'processDirection':1, 'inputArray':1, 'name':1, 'parentEffect':1, 'outputArray':1, 'footswitchType':1, 'footswitchNumber':1, 'paramArray':1,
			 'type':1, 'symbol':1
		}
		query_name = {'_id':0, 'name':1}
		results = components.find({},query_all)

		for x in results:
			name = x['name']
			print(name)
			components_data.append(x)

	except Exception as e:
		print(e)

	print("EXITING get_components")
	return components_data


def get_combo(combo_name):
	print("ENTERING get_combo")
	combo_data = ''
	try:
		results = combos.find({'name':combo_name},{'_id':0, 'name':1, 'effectConnectionArray':1, 'effectArray':1})
		for x in results:
			combo_data = x
	except Exception as e:
		print( e)

	print("EXITING get_combo")
	return combo_data

def save_combo(combo_name, combo_data):
	print("ENTERING save_combo")
	try:
		combo_data_json = json.loads(combo_data)
		print(combo_data_json['name'])
		combos.insert_one(combo_data_json)
	except Exception as e:
		print( e)

	print("EXITING save_combo")
	return get_combo_list()

def delete_combo(combo_name):
	try:
		combos.delete_one({'name':combo_name})

	except Exception as e:
		print( e)

	return get_combo_list()


@app.route('/')
def index():
	return render_template('index.html')

@app.route('/getComponents')
def getComponents():
	print( "getting Components")
	component_data = get_components()
	return Response(json.dumps(component_data),  mimetype='application/json')

@app.route('/listCombos')
def listCombos():
	print( "list Combos")
	try:
		combo_list = get_combo_list()
	except Exception as e:
		print( e)
	return Response(json.dumps(combo_list),  mimetype='application/json')

@app.route('/getCombo/<combo_name>')
def getCombo(combo_name):
	print( "get Combo")

	print( combo_name)
	command_string = combo_name
	print("command string: %s" % command_string)
	combo_data = get_combo(command_string)
	return jsonify(combo_data)


@app.route('/saveCombo', methods=["POST"])
def saveCombo():

	print( "save Combo")
	print( "*****************************************************************")
	request.get_data()
	combo_json = {}
	if request.get_json():
		combo_json = request.get_json()
	else:
		request_string = str(request.data, 'utf-8')
		print( "converting string to JSON")
		combo_json = json.loads(request_string)
	if combo_json:
		pass
	else:
		print( "NO JSON")

	combo_list = []
	try:
		combo_json_string = str(request.data, 'utf-8')
		combo_name = combo_json["name"]
		combo_list = save_combo(combo_name, combo_json_string)
	except Exception as e:
		print("Error: %s" % e)

	print( "Combo List:")
	print( combo_list)
	return Response(json.dumps(combo_list),  mimetype='application/json')



@app.route('/deleteCombo/<combo_name>', methods=["DELETE"])
def deleteCombo(combo_name):

	print( "delete Combo")
	command_string = combo_name
	print( command_string)
	combo_list = delete_combo(command_string)
	return Response(json.dumps(combo_list),  mimetype='application/json')


@app.route('/getCurrentStatus')
def getCurrentStatus():
	combo_string = usb_transfer("getCurrentStatus")
	print("combo string: %s" % combo_string)
	combo_json = {"ofxMainStatus":combo_string}
	return Response(json.dumps(combo_json),  mimetype='application/json')

@app.route('/changeValue', methods=["POST"])
def changeValue():
	request.get_data()
	print( "request.data")
	print( str(request.data, 'utf-8'))
	command = "changeValue:" + str(request.data, 'utf-8')
	print( "command: " + command)
	combo_string = usb_transfer(command)
	print( combo_string)
	return ('', httplib.NO_CONTENT)



